package com.aadhirai.billing.service;

import com.aadhirai.billing.controller.CreateInvoiceRequest;
import com.aadhirai.billing.model.*;
import com.aadhirai.billing.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
public class BillingService {

    private static final BigDecimal DEFAULT_TAX_RATE = new BigDecimal("0.18"); // 18% GST unless overridden

    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final InvoiceRepository invoiceRepository;
    private final BillNumberSequenceRepository billNumberSequenceRepository;

    public BillingService(ProductRepository productRepository, CustomerRepository customerRepository,
                           InvoiceRepository invoiceRepository, BillNumberSequenceRepository billNumberSequenceRepository) {
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.invoiceRepository = invoiceRepository;
        this.billNumberSequenceRepository = billNumberSequenceRepository;
    }

    public Product getProduct(String code) {
        return productRepository.findById(code.toUpperCase())
                .orElseThrow(() -> new ProductNotFoundException(code));
    }

    public Invoice getInvoice(UUID id) {
        return invoiceRepository.findById(id).orElseThrow(() -> new InvoiceNotFoundException(id.toString()));
    }

    public List<Invoice> listInvoices(String date) {
        if (date == null || date.isBlank()) {
            return invoiceRepository.findAllByOrderByCreatedAtDesc();
        }
        Instant from = Instant.parse(date + "T00:00:00Z");
        Instant to = from.plus(1, ChronoUnit.DAYS);
        return invoiceRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(from, to);
    }

    /**
     * Pricing is resolved before the transaction that touches the shared
     * bill-number counter, so a bad product code fails fast without ever
     * acquiring the counter's row lock.
     */
    @Transactional
    public Invoice createInvoice(CreateInvoiceRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BillingValidationException("At least one line item is required");
        }
        for (CreateInvoiceRequest.Item item : request.getItems()) {
            if (item.getProductCode() == null || item.getProductCode().isBlank() || item.getQuantity() <= 0) {
                throw new BillingValidationException("Each item needs a productCode and a positive quantity");
            }
        }

        Customer customer = null;
        if (request.getCustomerId() != null && !request.getCustomerId().isBlank()) {
            customer = customerRepository.findById(request.getCustomerId())
                    .orElseThrow(() -> new BillingValidationException("Unknown customerId: " + request.getCustomerId()));
        }

        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal tax = BigDecimal.ZERO;
        List<LineItem> lineItems = new java.util.ArrayList<>();

        for (CreateInvoiceRequest.Item item : request.getItems()) {
            Product product = getProduct(item.getProductCode());
            BigDecimal unitPrice = product.getPrice();
            if (customer != null && customer.getSpecialPricing().containsKey(product.getCode())) {
                unitPrice = customer.getSpecialPricing().get(product.getCode());
            }
            BigDecimal taxRate = product.getTaxRate() != null ? product.getTaxRate() : DEFAULT_TAX_RATE;
            BigDecimal lineSubtotal = unitPrice.multiply(BigDecimal.valueOf(item.getQuantity())).setScale(2, RoundingMode.HALF_UP);
            BigDecimal lineTax = lineSubtotal.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
            BigDecimal lineTotal = lineSubtotal.add(lineTax);

            subtotal = subtotal.add(lineSubtotal);
            tax = tax.add(lineTax);
            lineItems.add(new LineItem(product.getCode(), item.getQuantity(), unitPrice, taxRate, lineSubtotal, lineTax, lineTotal));
        }
        subtotal = subtotal.setScale(2, RoundingMode.HALF_UP);
        tax = tax.setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = subtotal.add(tax);

        String billNumber = nextBillNumber();
        Invoice invoice = new Invoice(billNumber, customer != null ? customer.getId() : null, subtotal, tax, total);
        lineItems.forEach(invoice::addItem);
        return invoiceRepository.save(invoice);
    }

    @Transactional
    public Invoice cancelInvoice(UUID id) {
        Invoice invoice = getInvoice(id);
        // Idempotent: cancelling an already-cancelled bill just returns it.
        // The bill number is never reassigned or reused (GST compliance).
        invoice.setStatus(Invoice.Status.CANCELLED);
        return invoiceRepository.save(invoice);
    }

    private String nextBillNumber() {
        BillNumberSequence seq = billNumberSequenceRepository.findForUpdate()
                .orElseGet(() -> billNumberSequenceRepository.save(new BillNumberSequence()));
        seq.setLastValue(seq.getLastValue() + 1);
        billNumberSequenceRepository.save(seq);
        return String.format("INV-%06d", seq.getLastValue());
    }
}

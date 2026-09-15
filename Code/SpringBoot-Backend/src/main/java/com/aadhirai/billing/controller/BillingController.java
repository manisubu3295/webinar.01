package com.aadhirai.billing.controller;

import com.aadhirai.billing.model.Invoice;
import com.aadhirai.billing.model.Product;
import com.aadhirai.billing.service.BillingService;
import com.aadhirai.billing.service.BillingValidationException;
import com.aadhirai.billing.service.InvoiceNotFoundException;
import com.aadhirai.billing.service.ProductNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @GetMapping("/products/{code}")
    public Product getProduct(@PathVariable String code) {
        return billingService.getProduct(code);
    }

    @PostMapping("/invoices")
    public ResponseEntity<Invoice> createInvoice(@RequestBody CreateInvoiceRequest request) {
        Invoice invoice = billingService.createInvoice(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(invoice);
    }

    @GetMapping("/invoices/{id}")
    public Invoice getInvoice(@PathVariable String id) {
        return billingService.getInvoice(parseId(id));
    }

    @PostMapping("/invoices/{id}/cancel")
    public Invoice cancelInvoice(@PathVariable String id) {
        return billingService.cancelInvoice(parseId(id));
    }

    @GetMapping("/invoices")
    public List<Invoice> listInvoices(@RequestParam(required = false) String date) {
        return billingService.listInvoices(date);
    }

    private UUID parseId(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException e) {
            throw new InvoiceNotFoundException(id);
        }
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleProductNotFound(ProductNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(InvoiceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleInvoiceNotFound(InvoiceNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(BillingValidationException.class)
    public ResponseEntity<Map<String, String>> handleValidation(BillingValidationException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
    }
}

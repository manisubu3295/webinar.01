package com.aadhirai.billing.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "line_items")
public class LineItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    @JsonIgnore
    private Invoice invoice;

    private String productCode;
    private int quantity;
    private BigDecimal unitPrice;
    private BigDecimal taxRate;
    private BigDecimal lineSubtotal;
    private BigDecimal lineTax;
    private BigDecimal lineTotal;

    protected LineItem() {
    }

    public LineItem(String productCode, int quantity, BigDecimal unitPrice, BigDecimal taxRate,
                     BigDecimal lineSubtotal, BigDecimal lineTax, BigDecimal lineTotal) {
        this.productCode = productCode;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.taxRate = taxRate;
        this.lineSubtotal = lineSubtotal;
        this.lineTax = lineTax;
        this.lineTotal = lineTotal;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    public String getProductCode() {
        return productCode;
    }

    public int getQuantity() {
        return quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public BigDecimal getTaxRate() {
        return taxRate;
    }

    public BigDecimal getLineSubtotal() {
        return lineSubtotal;
    }

    public BigDecimal getLineTax() {
        return lineTax;
    }

    public BigDecimal getLineTotal() {
        return lineTotal;
    }
}

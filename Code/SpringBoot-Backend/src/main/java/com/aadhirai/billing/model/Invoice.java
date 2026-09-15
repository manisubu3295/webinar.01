package com.aadhirai.billing.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "invoices")
public class Invoice {

    public enum Status {
        OPEN, CANCELLED
    }

    @Id
    private UUID id = UUID.randomUUID();

    @Column(unique = true, nullable = false)
    private String billNumber;

    /** Nullable — walk-in sales have no customer. */
    private String customerId;

    // EAGER: with spring.jpa.open-in-view=false, a lazy collection here would
    // throw LazyInitializationException the moment Jackson serializes the
    // response, since the Hibernate session closes as soon as the
    // (transactional) service method returns — before the HTTP response body
    // is written. Invoices have only a handful of line items, so eager
    // loading is cheap and keeps every read endpoint simple.
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<LineItem> items = new ArrayList<>();

    private BigDecimal subtotal;
    private BigDecimal tax;
    private BigDecimal total;

    @Enumerated(EnumType.STRING)
    private Status status = Status.OPEN;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Instant createdAt = Instant.now();

    protected Invoice() {
    }

    public Invoice(String billNumber, String customerId, BigDecimal subtotal, BigDecimal tax, BigDecimal total) {
        this.billNumber = billNumber;
        this.customerId = customerId;
        this.subtotal = subtotal;
        this.tax = tax;
        this.total = total;
    }

    public void addItem(LineItem item) {
        item.setInvoice(this);
        items.add(item);
    }

    public UUID getId() {
        return id;
    }

    public String getBillNumber() {
        return billNumber;
    }

    public String getCustomerId() {
        return customerId;
    }

    public List<LineItem> getItems() {
        return items;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}

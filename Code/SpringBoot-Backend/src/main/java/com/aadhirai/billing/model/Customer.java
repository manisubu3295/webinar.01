package com.aadhirai.billing.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    private String id;

    private String name;

    /** productCode -> negotiated unit price, overrides Product.price when present. */
    @ElementCollection
    @CollectionTable(name = "customer_special_pricing", joinColumns = @JoinColumn(name = "customer_id"))
    @MapKeyColumn(name = "product_code")
    @Column(name = "price")
    private Map<String, BigDecimal> specialPricing = new HashMap<>();

    protected Customer() {
    }

    public Customer(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Map<String, BigDecimal> getSpecialPricing() {
        return specialPricing;
    }
}

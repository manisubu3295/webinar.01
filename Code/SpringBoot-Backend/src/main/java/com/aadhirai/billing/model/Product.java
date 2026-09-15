package com.aadhirai.billing.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    private String code;

    private String name;

    private BigDecimal price;

    /** e.g. 0.18 for 18% GST */
    private BigDecimal taxRate;

    protected Product() {
    }

    public Product(String code, String name, BigDecimal price, BigDecimal taxRate) {
        this.code = code;
        this.name = name;
        this.price = price;
        this.taxRate = taxRate;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal getTaxRate() {
        return taxRate;
    }
}

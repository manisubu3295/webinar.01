package com.aadhirai.billing.service;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String code) {
        super("Product not found: " + code);
    }
}

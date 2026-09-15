package com.aadhirai.billing.service;

public class InvoiceNotFoundException extends RuntimeException {
    public InvoiceNotFoundException(String id) {
        super("Invoice not found: " + id);
    }
}

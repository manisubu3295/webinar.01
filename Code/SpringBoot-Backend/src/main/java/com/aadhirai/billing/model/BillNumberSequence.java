package com.aadhirai.billing.model;

import jakarta.persistence.*;

/**
 * A single-row counter table. See BillingService.nextBillNumber() for why
 * this is locked with PESSIMISTIC_WRITE inside a transaction rather than
 * just incremented.
 */
@Entity
@Table(name = "bill_number_sequence")
public class BillNumberSequence {

    @Id
    private Long id = 1L;

    private int lastValue = 1000;

    public Long getId() {
        return id;
    }

    public int getLastValue() {
        return lastValue;
    }

    public void setLastValue(int lastValue) {
        this.lastValue = lastValue;
    }
}

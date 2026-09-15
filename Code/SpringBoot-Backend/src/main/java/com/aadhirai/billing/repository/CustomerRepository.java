package com.aadhirai.billing.repository;

import com.aadhirai.billing.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, String> {
}

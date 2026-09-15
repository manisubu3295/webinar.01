package com.aadhirai.billing.repository;

import com.aadhirai.billing.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {

    List<Invoice> findByCreatedAtBetweenOrderByCreatedAtDesc(Instant from, Instant to);

    List<Invoice> findAllByOrderByCreatedAtDesc();
}

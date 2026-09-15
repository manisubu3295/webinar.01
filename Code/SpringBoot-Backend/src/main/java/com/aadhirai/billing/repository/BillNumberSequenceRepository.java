package com.aadhirai.billing.repository;

import com.aadhirai.billing.model.BillNumberSequence;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BillNumberSequenceRepository extends JpaRepository<BillNumberSequence, Long> {

    /**
     * PESSIMISTIC_WRITE takes a DB row lock (SELECT ... FOR UPDATE) on the
     * single counter row for the duration of the enclosing transaction, so a
     * second concurrent invoice-creation request blocks here until the first
     * one commits (releasing the lock) — the same guarantee `synchronized`
     * gives in-process, but enforced by the database itself, which is what
     * you want once this runs behind more than one app instance.
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select s from BillNumberSequence s where s.id = 1")
    Optional<BillNumberSequence> findForUpdate();
}

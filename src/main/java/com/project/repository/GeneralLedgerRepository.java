package com.project.repository;

import java.util.Optional;

import com.project.domain.GeneralLedger;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GeneralLedger entity.
 */
// @SuppressWarnings("unused")
@Repository
public interface GeneralLedgerRepository extends JpaRepository<GeneralLedger, Long> {
    @Query(value = "SELECT c.from_account_id as 'id',sysdate() as 'jhi_date', sum(if(c.transaction_type='DEBIT',cast(c.amount as decimal),0)) as 'transactions_sum_dr', sum(if(c.transaction_type='CREDIT',cast(c.amount as decimal),0)) as 'transactions_sum_cr',     sum(if(c.transaction_type='DEBIT',cast(c.amount as decimal),0)) as 'balance_sum_dr',     sum(if(c.transaction_type='CREDIT',cast(c.amount as decimal),0)) as 'balance_sum_cr',     c.from_account_id as 'account_ledger_id'     FROM cash_book c WHERE c.jhi_date >= MAKEDATE(year(sysdate()), 1) group by c.from_account_id order by c.from_account_id", nativeQuery = true)
    Page<GeneralLedger> findAllGeneralLedgers(Pageable pageable);
    Optional<GeneralLedger> findByAccountLedgerId(Long id);

}

package com.project.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.domain.AssetToAssetTransaction;
import com.project.domain.AssetToCapitalTransaction;
import com.project.domain.AssetToExpenditureTransaction;
import com.project.domain.AssetToIncomeTransaction;
import com.project.domain.AssetToLiabilityTransaction;
import com.project.domain.CapitalToAssetTransaction;
import com.project.domain.CapitalToExpenditureTransaction;
import com.project.domain.CashBook;
import com.project.domain.ExpenditureToAssetTransaction;
import com.project.domain.ExpenditureToCapitalTransaction;
import com.project.domain.IncomeToAssetTransaction;
import com.project.domain.LiabilityToAssetTransaction;
import com.project.domain.LiabilityToLiabilityTransaction;
import com.project.domain.Transaction;
import com.project.domain.enumeration.AccountType;
import com.project.repository.CashBookRepository;
import com.project.service.CashBookService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing CashBook.
 */
@Service
@Transactional
public class CashBookServiceImpl implements CashBookService {

    private final Logger log = LoggerFactory.getLogger(CashBookServiceImpl.class);

    private final CashBookRepository cashBookRepository;

    @Autowired

    public CashBookServiceImpl(CashBookRepository cashBookRepository) {
        this.cashBookRepository = cashBookRepository;
    }

    /**
     * Save a cashBook.
     *
     * @param cashBook the entity to save
     * @return the persisted entity
     */
    @Override
    public CashBook save(CashBook cashBook) {
        log.debug("Request to save CashBook : {}", cashBook);
        return cashBookRepository.save(cashBook);
    }

    /**
     * Get all the cashBooks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CashBook> findAll(Pageable pageable) {
        log.debug("Request to get all CashBooks");
        return cashBookRepository.findAll(pageable);
    }

    /**
     * Get one cashBook by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CashBook> findOne(Long id) {
        log.debug("Request to get CashBook : {}", id);
        return cashBookRepository.findById(id);
    }

    /**
     * Delete the cashBook by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CashBook : {}", id);
        cashBookRepository.deleteById(id);
    }

    @Override
    public void posting(CashBook cashBook) {

        Transaction transaction;
        List<CashBook> transactionList = new ArrayList<CashBook>();
        if (cashBook.getFromAccount().getType() == AccountType.ASSET
                && cashBook.getToAccount().getType() == AccountType.ASSET) {
            transaction = new AssetToAssetTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());
        } else if (cashBook.getFromAccount().getType() == AccountType.LIABILITY
                && cashBook.getToAccount().getType() == AccountType.LIABILITY) {
            transaction = new LiabilityToLiabilityTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());
        } else if (cashBook.getFromAccount().getType() == AccountType.ASSET
                && cashBook.getToAccount().getType() == AccountType.LIABILITY) {
            transaction = new AssetToLiabilityTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());
        } else if (cashBook.getFromAccount().getType() == AccountType.LIABILITY
                && cashBook.getToAccount().getType() == AccountType.ASSET) {
            transaction = new LiabilityToAssetTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());
        } else if (cashBook.getFromAccount().getType() == AccountType.ASSET
                && cashBook.getToAccount().getType() == AccountType.CAPITAL) {
            transaction = new AssetToCapitalTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());
        } else if (cashBook.getFromAccount().getType() == AccountType.CAPITAL
                && cashBook.getToAccount().getType() == AccountType.ASSET) {
            transaction = new CapitalToAssetTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());
        } else if (cashBook.getFromAccount().getType() == AccountType.ASSET
                && cashBook.getToAccount().getType() == AccountType.INCOME) {
            transaction = new AssetToIncomeTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());
        } else if (cashBook.getFromAccount().getType() == AccountType.ASSET
                && cashBook.getToAccount().getType() == AccountType.EXPENDITURE) {
            transaction = new AssetToExpenditureTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());
        } else if (cashBook.getFromAccount().getType() == AccountType.INCOME
                && cashBook.getToAccount().getType() == AccountType.ASSET) {
            transaction = new IncomeToAssetTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());
        } else if (cashBook.getFromAccount().getType() == AccountType.EXPENDITURE
                && cashBook.getToAccount().getType() == AccountType.ASSET) {
            transaction = new ExpenditureToAssetTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());

        } else if (cashBook.getFromAccount().getType() == AccountType.EXPENDITURE
                && cashBook.getToAccount().getType() == AccountType.CAPITAL) {
            transaction = new ExpenditureToCapitalTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());

        } else if (cashBook.getFromAccount().getType() == AccountType.CAPITAL
                && cashBook.getToAccount().getType() == AccountType.EXPENDITURE) {
            transaction = new CapitalToExpenditureTransaction();
            transactionList = transaction.getTransactions(cashBook.getFromAccount(), cashBook.getToAccount(),
                    cashBook.getAmount());

        }
        for (CashBook entry : transactionList) {
            cashBookRepository.save(entry);
        }

    }
}

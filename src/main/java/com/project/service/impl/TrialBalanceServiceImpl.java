package com.project.service.impl;

import java.math.BigDecimal;
import java.util.Optional;

import com.project.domain.TrialBalance;
import com.project.repository.TrialBalanceRepository;
import com.project.service.TrialBalanceService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing TrialBalance.
 */
@Service
// @Transactional
public class TrialBalanceServiceImpl implements TrialBalanceService {

    private final Logger log = LoggerFactory.getLogger(TrialBalanceServiceImpl.class);

    private final TrialBalanceRepository trialBalanceRepository;
    @Autowired
    GeneralAccountServiceImpl generalAccountServiceImpl;
    @Autowired
    CurrencyServiceImpl currencyServiceImpl;

    public TrialBalanceServiceImpl(TrialBalanceRepository trialBalanceRepository) {
        this.trialBalanceRepository = trialBalanceRepository;
    }

    /**
     * Save a trialBalance.
     *
     * @param trialBalance the entity to save
     * @return the persisted entity
     */
    @Override
    public TrialBalance save(TrialBalance trialBalance) {
        log.debug("Request to save TrialBalance : {}", trialBalance);
        return trialBalanceRepository.save(trialBalance);
    }

    /**
     * Get all the trialBalances.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    // @Transactional
    public Page<TrialBalance> findAll(Pageable pageable) {
        log.debug("Request to get all TrialBalances");

        trialBalanceRepository.deleteAll();

        Page<TrialBalance> trialBalances = trialBalanceRepository.findAllTrialBalances(pageable);

        for (TrialBalance trialBalance : trialBalances.getContent()) {
            int returnVal = trialBalance.getCredit().compareTo(trialBalance.getDebit());
             if (returnVal == -1) {
                trialBalance.setDebit(trialBalance.getDebit().subtract(trialBalance.getCredit()));
                trialBalance.setCredit(BigDecimal.ZERO);

            } else if (returnVal == 1) 
            {
                trialBalance.setCredit(trialBalance.getCredit().subtract(trialBalance.getDebit()));
                trialBalance.setDebit(BigDecimal.ZERO);
            }

            if (returnVal != 0) {
                save(trialBalance);
            } 

        }
        
        return trialBalances;
    }

    /**
     * Get one trialBalance by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TrialBalance> findOne(Long id) {
        log.debug("Request to get TrialBalance : {}", id);
        return trialBalanceRepository.findById(id);
    }

    /**
     * Delete the trialBalance by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TrialBalance : {}", id);
        trialBalanceRepository.deleteById(id);
    }

}

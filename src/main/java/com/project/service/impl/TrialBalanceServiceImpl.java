package com.project.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import com.project.domain.TrialBalance;
import com.project.repository.CashBookRepository;
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

        Page<TrialBalance> trialBalances = trialBalanceRepository.findAllTrialBalances(pageable);
        // // System.out.println("trialBalances:::::::::::" + trialBalances);
        for (TrialBalance trialBalance : trialBalances.getContent()) {
            // System.out.println("trialBalance:::::::::::" + trialBalance);
            // int returnVal = trialBalance.getCredit().compareTo(trialBalance.getDebit());
            //  if (returnVal == -1) {
            //     trialBalance.setCredit(BigDecimal.ZERO);
            //     trialBalance.setDebit(trialBalance.getDebit().subtract(trialBalance.getCredit()));
            // } else if (returnVal == 1) 
            // {
            //     trialBalance.setDebit(BigDecimal.ZERO);
            //     trialBalance.setCredit(trialBalance.getCredit().subtract(trialBalance.getDebit()));
            // }
            

            // if (returnVal != 0) {
                // trialBalance.setId(null);
                save(trialBalance);
            // } 
            // System.out.println("trialBalances:::::::::After::::::::"+trialBalance);

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

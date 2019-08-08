package com.project.service.impl;

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
@Transactional
public class TrialBalanceServiceImpl implements TrialBalanceService {

    private final Logger log = LoggerFactory.getLogger(TrialBalanceServiceImpl.class);

    private final TrialBalanceRepository trialBalanceRepository;
    @Autowired
    private CashBookRepository cashBookRepository;
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
    @Transactional
    public Page<TrialBalance> findAll(Pageable pageable) {
        log.debug("Request to get all TrialBalances");

        List<TrialBalance> trialBalances = trialBalanceRepository.findAllTrialBalances();
        System.out.println("trialBalances:::::::::::" + trialBalances);
        for (TrialBalance trialBalance : trialBalances) {
            System.out.println("trialBalance::::::::::  " + trialBalance);
            // trialBalance.setTrialBalance(generalAccountServiceImpl.findOne((long)
            // trialBalance.getTrialBalance().getId()).get());
            save(trialBalance);
        }
        System.out.println("trialBalances:" + trialBalances);
        return trialBalanceRepository.findAll(pageable);
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

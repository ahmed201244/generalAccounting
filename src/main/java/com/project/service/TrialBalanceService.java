package com.project.service;

import java.util.Optional;

import com.project.domain.TrialBalance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing TrialBalance.
 */
public interface TrialBalanceService {

    /**
     * Save a trialBalance.
     *
     * @param trialBalance the entity to save
     * @return the persisted entity
     */
    TrialBalance save(TrialBalance trialBalance);

    /**
     * Get all the trialBalances.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TrialBalance> findAll(Pageable pageable);
    /**
     * Get all the trialBalances.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */

    /**
     * Get the "id" trialBalance.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TrialBalance> findOne(Long id);

    /**
     * Delete the "id" trialBalance.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}

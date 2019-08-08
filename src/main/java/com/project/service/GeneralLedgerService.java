package com.project.service;

import com.project.domain.GeneralLedger;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing GeneralLedger.
 */
public interface GeneralLedgerService {

    /**
     * Save a generalLedger.
     *
     * @param generalLedger the entity to save
     * @return the persisted entity
     */
    GeneralLedger save(GeneralLedger generalLedger);

    /**
     * Get all the generalLedgers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<GeneralLedger> findAll(Pageable pageable);


    /**
     * Get the "id" generalLedger.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GeneralLedger> findOne(Long id);

    /**
     * Delete the "id" generalLedger.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}

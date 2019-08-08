package com.project.service;

import com.project.domain.GeneralAccount;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing GeneralAccount.
 */
public interface GeneralAccountService {

    /**
     * Save a generalAccount.
     *
     * @param generalAccount the entity to save
     * @return the persisted entity
     */
    GeneralAccount save(GeneralAccount generalAccount);

    /**
     * Get all the generalAccounts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<GeneralAccount> findAll(Pageable pageable);


    /**
     * Get the "id" generalAccount.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GeneralAccount> findOne(Long id);

    /**
     * Delete the "id" generalAccount.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}

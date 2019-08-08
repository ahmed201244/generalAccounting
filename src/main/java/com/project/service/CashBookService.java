package com.project.service;

import com.project.domain.CashBook;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing CashBook.
 */
public interface CashBookService {

    /**
     * Save a cashBook.
     *
     * @param cashBook the entity to save
     * @return the persisted entity
     */
    CashBook save(CashBook cashBook);

    /**
     * Get all the cashBooks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CashBook> findAll(Pageable pageable);


    /**
     * Get the "id" cashBook.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CashBook> findOne(Long id);

    /**
     * Delete the "id" cashBook.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
  
    void posting(CashBook cashBook);


}

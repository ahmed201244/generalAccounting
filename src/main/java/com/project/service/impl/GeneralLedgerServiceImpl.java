package com.project.service.impl;

import com.project.service.GeneralLedgerService;
import com.project.domain.GeneralLedger;
import com.project.repository.GeneralLedgerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing GeneralLedger.
 */
@Service
@Transactional
public class GeneralLedgerServiceImpl implements GeneralLedgerService {

    private final Logger log = LoggerFactory.getLogger(GeneralLedgerServiceImpl.class);

    private final GeneralLedgerRepository generalLedgerRepository;

    public GeneralLedgerServiceImpl(GeneralLedgerRepository generalLedgerRepository) {
        this.generalLedgerRepository = generalLedgerRepository;
    }

    /**
     * Save a generalLedger.
     *
     * @param generalLedger the entity to save
     * @return the persisted entity
     */
    @Override
    public GeneralLedger save(GeneralLedger generalLedger) {
        log.debug("Request to save GeneralLedger : {}", generalLedger);
        return generalLedgerRepository.save(generalLedger);
    }

    /**
     * Get all the generalLedgers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<GeneralLedger> findAll(Pageable pageable) {
        log.debug("Request to get all GeneralLedgers");
        return generalLedgerRepository.findAll(pageable);
    }


    /**
     * Get one generalLedger by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GeneralLedger> findOne(Long id) {
        log.debug("Request to get GeneralLedger : {}", id);
        return generalLedgerRepository.findById(id);
    }

    /**
     * Delete the generalLedger by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GeneralLedger : {}", id);        generalLedgerRepository.deleteById(id);
    }
}

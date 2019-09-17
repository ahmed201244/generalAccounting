package com.project.service.impl;

import com.project.service.GeneralAccountService;
import com.project.domain.GeneralAccount;
import com.project.repository.GeneralAccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing GeneralAccount.
 */
@Service
@Transactional
public class GeneralAccountServiceImpl implements GeneralAccountService {

    private final Logger log = LoggerFactory.getLogger(GeneralAccountServiceImpl.class);

    private final GeneralAccountRepository generalAccountRepository;

    public GeneralAccountServiceImpl(GeneralAccountRepository generalAccountRepository) {
        this.generalAccountRepository = generalAccountRepository;
    }

    /**
     * Save a generalAccount.
     *
     * @param generalAccount the entity to save
     * @return the persisted entity
     */
    @Override
    public GeneralAccount save(GeneralAccount generalAccount) {
        log.debug("Request to save GeneralAccount : {}", generalAccount);
        return generalAccountRepository.save(generalAccount);
    }

    /**
     * Get all the generalAccounts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<GeneralAccount> findAll(Pageable pageable) {
        log.debug("Request to get all GeneralAccounts");
        return generalAccountRepository.findAll(pageable);
    }


    /**
     * Get one generalAccount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GeneralAccount> findOne(Long id) {
        log.debug("Request to get GeneralAccount : {}", id);
        return generalAccountRepository.findById(id);
    }

    /**
     * Delete the generalAccount by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GeneralAccount : {}", id);        
        generalAccountRepository.deleteById(id);
    }
}

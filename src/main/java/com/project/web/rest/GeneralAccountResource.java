package com.project.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.project.domain.GeneralAccount;
import com.project.service.GeneralAccountService;
import com.project.web.rest.errors.BadRequestAlertException;
import com.project.web.rest.util.HeaderUtil;
import com.project.web.rest.util.PaginationUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing GeneralAccount.
 */
@RestController
@RequestMapping("/api")
public class GeneralAccountResource {

    private final Logger log = LoggerFactory.getLogger(GeneralAccountResource.class);

    private static final String ENTITY_NAME = "generalAccount";

    private final GeneralAccountService generalAccountService;

    public GeneralAccountResource(GeneralAccountService generalAccountService) {
        this.generalAccountService = generalAccountService;
    }

    /**
     * POST  /general-accounts : Create a new generalAccount.
     *
     * @param generalAccount the generalAccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new generalAccount, or with status 400 (Bad Request) if the generalAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/general-accounts")
    public ResponseEntity<GeneralAccount> createGeneralAccount(@Valid @RequestBody GeneralAccount generalAccount) throws URISyntaxException {
        log.debug("REST request to save GeneralAccount : {}", generalAccount);
        if (generalAccount.getId() != null) {
            throw new BadRequestAlertException("A new generalAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GeneralAccount result = generalAccountService.save(generalAccount);
        return ResponseEntity.created(new URI("/api/general-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /general-accounts : Updates an existing generalAccount.
     *
     * @param generalAccount the generalAccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated generalAccount,
     * or with status 400 (Bad Request) if the generalAccount is not valid,
     * or with status 500 (Internal Server Error) if the generalAccount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/general-accounts")
    public ResponseEntity<GeneralAccount> updateGeneralAccount(@Valid @RequestBody GeneralAccount generalAccount) throws URISyntaxException {
        log.debug("REST request to update GeneralAccount : {}", generalAccount);
        if (generalAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GeneralAccount result = generalAccountService.save(generalAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, generalAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /general-accounts : get all the generalAccounts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of generalAccounts in body
     */
    @GetMapping("/general-accounts")
    public ResponseEntity<List<GeneralAccount>> getAllGeneralAccounts(Pageable pageable) {
        log.debug("REST request to get a page of GeneralAccounts");
        Page<GeneralAccount> page = generalAccountService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/general-accounts");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /general-accounts/:id : get the "id" generalAccount.
     *
     * @param id the id of the generalAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the generalAccount, or with status 404 (Not Found)
     */
    @GetMapping("/general-accounts/{id}")
    public ResponseEntity<GeneralAccount> getGeneralAccount(@PathVariable Long id) {
        log.debug("REST request to get GeneralAccount : {}", id);
        Optional<GeneralAccount> generalAccount = generalAccountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(generalAccount);
    }

    /**
     * DELETE  /general-accounts/:id : delete the "id" generalAccount.
     *
     * @param id the id of the generalAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/general-accounts/{id}")
    public ResponseEntity<Void> deleteGeneralAccount(@PathVariable Long id) {
        log.debug("REST request to delete GeneralAccount : {}", id);
        generalAccountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

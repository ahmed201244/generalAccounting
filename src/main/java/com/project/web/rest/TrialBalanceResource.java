package com.project.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import com.project.domain.TrialBalance;
import com.project.service.TrialBalanceService;
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
 * REST controller for managing TrialBalance.
 */
@RestController
@RequestMapping("/api")
public class TrialBalanceResource {

    private final Logger log = LoggerFactory.getLogger(TrialBalanceResource.class);

    private static final String ENTITY_NAME = "trialBalance";

    private final TrialBalanceService trialBalanceService;

    public TrialBalanceResource(TrialBalanceService trialBalanceService) {
        this.trialBalanceService = trialBalanceService;
    }

    /**
     * POST  /trial-balances : Create a new trialBalance.
     *
     * @param trialBalance the trialBalance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new trialBalance, or with status 400 (Bad Request) if the trialBalance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/trial-balances")
    public ResponseEntity<TrialBalance> createTrialBalance(@RequestBody TrialBalance trialBalance) throws URISyntaxException {
        log.debug("REST request to save TrialBalance : {}", trialBalance);
        if (trialBalance.getId() != null) {
            throw new BadRequestAlertException("A new trialBalance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrialBalance result = trialBalanceService.save(trialBalance);
        return ResponseEntity.created(new URI("/api/trial-balances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /trial-balances : Updates an existing trialBalance.
     *
     * @param trialBalance the trialBalance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated trialBalance,
     * or with status 400 (Bad Request) if the trialBalance is not valid,
     * or with status 500 (Internal Server Error) if the trialBalance couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/trial-balances")
    public ResponseEntity<TrialBalance> updateTrialBalance(@RequestBody TrialBalance trialBalance) throws URISyntaxException {
        log.debug("REST request to update TrialBalance : {}", trialBalance);
        if (trialBalance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrialBalance result = trialBalanceService.save(trialBalance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, trialBalance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /trial-balances : get all the trialBalances.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of trialBalances in body
     */
    @GetMapping("/trial-balances")
    public ResponseEntity<List<TrialBalance>> getAllTrialBalances(Pageable pageable) {
        log.debug("REST request to get a page of TrialBalances");
        Page<TrialBalance> page = trialBalanceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/trial-balances");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /trial-balances/:id : get the "id" trialBalance.
     *
     * @param id the id of the trialBalance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the trialBalance, or with status 404 (Not Found)
     */
    @GetMapping("/trial-balances/{id}")
    public ResponseEntity<TrialBalance> getTrialBalance(@PathVariable Long id) {
        log.debug("REST request to get TrialBalance : {}", id);
        Optional<TrialBalance> trialBalance = trialBalanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trialBalance);
    }

    /**
     * DELETE  /trial-balances/:id : delete the "id" trialBalance.
     *
     * @param id the id of the trialBalance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/trial-balances/{id}")
    public ResponseEntity<Void> deleteTrialBalance(@PathVariable Long id) {
        log.debug("REST request to delete TrialBalance : {}", id);
        trialBalanceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package com.project.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import com.project.domain.GeneralLedger;
import com.project.service.GeneralLedgerService;
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
 * REST controller for managing GeneralLedger.
 */
@RestController
@RequestMapping("/api")
public class GeneralLedgerResource {

    private final Logger log = LoggerFactory.getLogger(GeneralLedgerResource.class);

    private static final String ENTITY_NAME = "generalLedger";

    private final GeneralLedgerService generalLedgerService;

    public GeneralLedgerResource(GeneralLedgerService generalLedgerService) {
        this.generalLedgerService = generalLedgerService;
    }

    /**
     * POST  /general-ledgers : Create a new generalLedger.
     *
     * @param generalLedger the generalLedger to create
     * @return the ResponseEntity with status 201 (Created) and with body the new generalLedger, or with status 400 (Bad Request) if the generalLedger has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/general-ledgers")
    public ResponseEntity<GeneralLedger> createGeneralLedger(@RequestBody GeneralLedger generalLedger) throws URISyntaxException {
        log.debug("REST request to save GeneralLedger : {}", generalLedger);
        if (generalLedger.getId() != null) {
            throw new BadRequestAlertException("A new generalLedger cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GeneralLedger result = generalLedgerService.save(generalLedger);
        return ResponseEntity.created(new URI("/api/general-ledgers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /general-ledgers : Updates an existing generalLedger.
     *
     * @param generalLedger the generalLedger to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated generalLedger,
     * or with status 400 (Bad Request) if the generalLedger is not valid,
     * or with status 500 (Internal Server Error) if the generalLedger couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/general-ledgers")
    public ResponseEntity<GeneralLedger> updateGeneralLedger(@RequestBody GeneralLedger generalLedger) throws URISyntaxException {
        log.debug("REST request to update GeneralLedger : {}", generalLedger);
        if (generalLedger.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GeneralLedger result = generalLedgerService.save(generalLedger);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, generalLedger.getId().toString()))
            .body(result);
    }

    /**
     * GET  /general-ledgers : get all the generalLedgers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of generalLedgers in body
     */
    @GetMapping("/general-ledgers")
    public ResponseEntity<List<GeneralLedger>> getAllGeneralLedgers(Pageable pageable) {
        log.debug("REST request to get a page of GeneralLedgers");
        Page<GeneralLedger> page = generalLedgerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/general-ledgers");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /general-ledgers/:id : get the "id" generalLedger.
     *
     * @param id the id of the generalLedger to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the generalLedger, or with status 404 (Not Found)
     */
    @GetMapping("/general-ledgers/{id}")
    public ResponseEntity<GeneralLedger> getGeneralLedger(@PathVariable Long id) {
        log.debug("REST request to get GeneralLedger : {}", id);
        Optional<GeneralLedger> generalLedger = generalLedgerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(generalLedger);
    }

    /**
     * DELETE  /general-ledgers/:id : delete the "id" generalLedger.
     *
     * @param id the id of the generalLedger to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/general-ledgers/{id}")
    public ResponseEntity<Void> deleteGeneralLedger(@PathVariable Long id) {
        log.debug("REST request to delete GeneralLedger : {}", id);
        generalLedgerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

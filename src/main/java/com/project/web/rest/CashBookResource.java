package com.project.web.rest;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.project.domain.CashBook;
import com.project.service.CashBookService;
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
 * REST controller for managing CashBook.
 */
@RestController
@RequestMapping("/api")
public class CashBookResource {

    private final Logger log = LoggerFactory.getLogger(CashBookResource.class);

    private static final String ENTITY_NAME = "cashBook";

    private final CashBookService cashBookService;

    public CashBookResource(CashBookService cashBookService) {
        this.cashBookService = cashBookService;
    }

    /**
     * POST  /cash-books : Create a new cashBook.
     *
     * @param cashBook the cashBook to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cashBook, or with status 400 (Bad Request) if the cashBook has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cash-books")
    public void createCashBook(@Valid @RequestBody CashBook cashBook) throws URISyntaxException {
        log.debug("REST request to save CashBook : {}", cashBook);
        if (cashBook.getId() != null) {
            throw new BadRequestAlertException("A new cashBook cannot already have an ID", ENTITY_NAME, "idexists");
        }
         cashBookService.posting(cashBook);
        // return ResponseEntity.created(new URI("/api/cash-books/" + result.getId()))
        //     .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
        //     // .body(result);
    }

    /**
     * PUT  /cash-books : Updates an existing cashBook.
     *
     * @param cashBook the cashBook to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cashBook,
     * or with status 400 (Bad Request) if the cashBook is not valid,
     * or with status 500 (Internal Server Error) if the cashBook couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cash-books")
    public ResponseEntity<CashBook> updateCashBook(@Valid @RequestBody CashBook cashBook) throws URISyntaxException {
        log.debug("REST request to update CashBook : {}", cashBook);
        if (cashBook.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CashBook result = cashBookService.save(cashBook);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cashBook.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cash-books : get all the cashBooks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cashBooks in body
     */
    @GetMapping("/cash-books")
    public ResponseEntity<List<CashBook>> getAllCashBooks(Pageable pageable) {
        log.debug("REST request to get a page of CashBooks");
        Page<CashBook> page = cashBookService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cash-books");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /cash-books/:id : get the "id" cashBook.
     *
     * @param id the id of the cashBook to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cashBook, or with status 404 (Not Found)
     */
    @GetMapping("/cash-books/{id}")
    public ResponseEntity<CashBook> getCashBook(@PathVariable Long id) {
        log.debug("REST request to get CashBook : {}", id);
        Optional<CashBook> cashBook = cashBookService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cashBook);
    }

    /**
     * DELETE  /cash-books/:id : delete the "id" cashBook.
     *
     * @param id the id of the cashBook to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cash-books/{id}")
    public ResponseEntity<Void> deleteCashBook(@PathVariable Long id) {
        log.debug("REST request to delete CashBook : {}", id);
        cashBookService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

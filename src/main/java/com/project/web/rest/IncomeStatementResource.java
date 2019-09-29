package com.project.web.rest;

import com.project.service.BalanceSheetService;
import com.project.service.IncomeStatementService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class IncomeStatementResource {

    private final Logger log = LoggerFactory.getLogger(IncomeStatementResource.class);

    @Autowired
    IncomeStatementService incomeStatementService;

    @GetMapping("/Income-Statement")
    public ResponseEntity<byte[]> getBalanceSheetAsBytes(Pageable pageable) {
        log.debug("REST request to get a Income Statement As byte[]");
        byte[] reportAsBytes = incomeStatementService.getIncomeStatement();
        return ResponseEntity.ok().body(reportAsBytes);
    }

}
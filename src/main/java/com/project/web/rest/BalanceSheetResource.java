package com.project.web.rest;

import com.project.service.BalanceSheetService;

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
public class BalanceSheetResource {

    private final Logger log = LoggerFactory.getLogger(BalanceSheetResource.class);

    @Autowired
    BalanceSheetService balanceSheetService;

    @GetMapping("/Balance-Sheet")
    public ResponseEntity<byte[]> getBalanceSheetAsBytes(Pageable pageable) {
        log.debug("REST request to get a Balance Sheet As byte[]");
        byte[] reportAsBytes = balanceSheetService.getBalanceSheet();
        return ResponseEntity.ok().body(reportAsBytes);
    }

}
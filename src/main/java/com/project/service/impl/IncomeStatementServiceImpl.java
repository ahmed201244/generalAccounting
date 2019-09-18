package com.project.service.impl;

import java.util.List;

import com.project.domain.GeneralAccount;
import com.project.service.IncomeStatementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

public class IncomeStatementServiceImpl implements IncomeStatementService {
    
    @Autowired
    GetAccountsServiceImpl getAccountsServiceImpl;
    @Autowired
    TrialBalanceServiceImpl trialBalanceServiceImpl;
    @Autowired
    GeneralLedgerServiceImpl generalLedgerServiceImpl;
    @Autowired
    GeneralAccount profitAndLossAccount;

    @Override
    public boolean processStatement() {
        
        // call TrialBalance service to refresh the data
        trialBalanceServiceImpl.findAll(Pageable.unpaged());
        
        // call GeneralLedger service to refresh the data
        generalLedgerServiceImpl.findAll(Pageable.unpaged());

        // initialize the profit and loss Account to calculate the net profit.
        profitAndLossAccount = getAccountsServiceImpl.getProfitAndLossAccount().get();

        List<GeneralAccount> allAccounts = getAccountsServiceImpl.getAllAccounts();
        for(GeneralAccount generalAccount: allAccounts)
        {
        }
        
        return false;
    }

}
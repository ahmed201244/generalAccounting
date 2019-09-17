package com.project.service;

import java.util.List;

import com.project.domain.GeneralAccount;

public interface GetAccountsService {
    public List<GeneralAccount> getAllAccounts();
    public List<GeneralAccount> getAllIncomeAccounts();
    public List<GeneralAccount> getAllExpenditureAccounts();
    public List<GeneralAccount> getInventoryAccounts();
    public GeneralAccount getProfitAndLossAccount();
    public GeneralAccount getOpenInventoryAccount();
    public GeneralAccount getCloseInventoryAccount();
}
package com.project.service;

import java.util.List;
import java.util.Optional;

import com.project.domain.GeneralAccount;

public interface GetAccountsService {
    public List<GeneralAccount> getAllAccounts();
    public List<GeneralAccount> getAllIncomeAccounts();
    public List<GeneralAccount> getAllExpenditureAccounts();
    public List<GeneralAccount> getInventoryAccounts();
    public Optional<GeneralAccount> getProfitAndLossAccount();
    public Optional<GeneralAccount> getOpenInventoryAccount();
    public Optional<GeneralAccount> getCloseInventoryAccount();
}
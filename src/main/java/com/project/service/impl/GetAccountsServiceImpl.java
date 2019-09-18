package com.project.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.config.ApplicationProperties;
import com.project.domain.GeneralAccount;
import com.project.domain.enumeration.AccountType;
import com.project.service.GetAccountsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetAccountsServiceImpl implements GetAccountsService {
    @Autowired
    ApplicationProperties applicationProperties;
    @Autowired
    GeneralAccountServiceImpl generalAccountServiceImpl;

    @Override
    public List<GeneralAccount> getAllAccounts() {
        // This will return all the account related to the calculation of Profit and Loss Statement.
        List<GeneralAccount> allAccounts = new ArrayList<>();
        // Add Inventory Account or Accounts
        allAccounts.addAll(getInventoryAccounts());
        // Add Income Accounts
        allAccounts.addAll(getAllIncomeAccounts());
        // Add Expenditure Accounts
        allAccounts.addAll(getAllExpenditureAccounts());

        return allAccounts;

    }

    @Override
    public List<GeneralAccount> getAllIncomeAccounts() {
        List<GeneralAccount> incomeAccounts = new ArrayList<GeneralAccount>();
        incomeAccounts.addAll(generalAccountServiceImpl.findByType(AccountType.INCOME));
        return incomeAccounts;
    }

    @Override
    public List<GeneralAccount> getAllExpenditureAccounts() {
        List<GeneralAccount> expenditureAccounts = new ArrayList<GeneralAccount>();
        expenditureAccounts.addAll(generalAccountServiceImpl.findByType(AccountType.EXPENDITURE));
        return expenditureAccounts;
    }

    @Override
    public List<GeneralAccount> getInventoryAccounts() {
        List<GeneralAccount> inventoryAccounts = new ArrayList<GeneralAccount>();
        if (applicationProperties.getSingleInventoryAccount()) {
            inventoryAccounts.add(generalAccountServiceImpl.findByCode(applicationProperties.getInventoryAccount()).get());
        } else {
            inventoryAccounts.add(generalAccountServiceImpl.findByCode(applicationProperties.getSalesAccount()).get());
            inventoryAccounts.add(generalAccountServiceImpl.findByCode(applicationProperties.getPurchaseAccount()).get());
            inventoryAccounts.add(generalAccountServiceImpl.findByCode(applicationProperties.getReturnInwardAccount()).get());
            inventoryAccounts.add(generalAccountServiceImpl.findByCode(applicationProperties.getReturnOutwardAccount()).get());
        }
        return inventoryAccounts;

    }

    @Override
    public Optional<GeneralAccount> getOpenInventoryAccount() {
        return generalAccountServiceImpl.findByCode(applicationProperties.getOpenInventoryAccount());
    }

    @Override
    public Optional<GeneralAccount> getCloseInventoryAccount() {
        return generalAccountServiceImpl.findByCode(applicationProperties.getCloseInventoryAccount());
    }

    @Override
    public Optional<GeneralAccount> getProfitAndLossAccount() {
        return generalAccountServiceImpl.findByCode(applicationProperties.getProfitAndLossAccount());
    }

}
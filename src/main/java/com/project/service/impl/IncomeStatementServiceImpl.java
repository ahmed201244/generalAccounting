package com.project.service.impl;

import java.util.List;

import com.project.domain.CashBook;
import com.project.domain.GeneralAccount;
import com.project.domain.GeneralLedger;
import com.project.service.IncomeStatementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class IncomeStatementServiceImpl implements IncomeStatementService {

    @Autowired
    GetAccountsServiceImpl getAccountsServiceImpl;
    @Autowired
    TrialBalanceServiceImpl trialBalanceServiceImpl;
    @Autowired
    GeneralLedgerServiceImpl generalLedgerServiceImpl;
    @Autowired
    CashBookServiceImpl cashBookServiceImpl;

    GeneralAccount profitAndLossAccount = new GeneralAccount();
    CashBook cashBook = new CashBook();

    @Override
    public boolean processStatement() {

        // call TrialBalance service to refresh the data
        trialBalanceServiceImpl.findAll(Pageable.unpaged());

        // call GeneralLedger service to refresh the data
        generalLedgerServiceImpl.findAll(Pageable.unpaged());

        // initialize the profit and loss Account to calculate the net profit.
        profitAndLossAccount = getAccountsServiceImpl.getProfitAndLossAccount().get();

        // move the inventory accounts' balances to the profit and loss Account.
        List<GeneralAccount> inventoryAccounts = getAccountsServiceImpl.getInventoryAccounts();
        for (GeneralAccount generalAccount : inventoryAccounts) {
            if (generalLedgerServiceImpl.findOneByAccountLedgerId(generalAccount.getId()).isPresent()) {
                GeneralLedger inventoryAccountGeneralLedger = generalLedgerServiceImpl.findOneByAccountLedgerId(generalAccount.getId()).get();
                        
                if (inventoryAccountGeneralLedger.getBalanceSumDr()
                        .compareTo(inventoryAccountGeneralLedger.getBalanceSumCr()) == 1) {
                    cashBook.setTansactionCurrency(generalAccount.getGeneralAccountCurrency());
                    cashBook.setAmount(inventoryAccountGeneralLedger.getBalanceSumDr()
                            .subtract(inventoryAccountGeneralLedger.getBalanceSumCr()).doubleValue());
                    cashBook.setFromAccount(generalAccount);
                    cashBook.setToAccount(profitAndLossAccount);
                    cashBookServiceImpl.posting(cashBook);
                } else if (inventoryAccountGeneralLedger.getBalanceSumDr()
                        .compareTo(inventoryAccountGeneralLedger.getBalanceSumCr()) == -1) {
                    cashBook.setTansactionCurrency(generalAccount.getGeneralAccountCurrency());
                    cashBook.setAmount(inventoryAccountGeneralLedger.getBalanceSumCr()
                            .subtract(inventoryAccountGeneralLedger.getBalanceSumDr()).doubleValue());
                    cashBook.setFromAccount(profitAndLossAccount);
                    cashBook.setToAccount(generalAccount);
                    cashBookServiceImpl.posting(cashBook);
                }
            }
        }
        // move income Accounts balances to the profit and loss Account
        List<GeneralAccount> incomeAccounts = getAccountsServiceImpl.getAllIncomeAccounts();
        for (GeneralAccount generalAccount : incomeAccounts) {
            if (generalLedgerServiceImpl.findOneByAccountLedgerId(generalAccount.getId()).isPresent()) {
                GeneralLedger incomeAccountGeneralLedger = generalLedgerServiceImpl.findOneByAccountLedgerId(generalAccount.getId())
                        .get();
                if (incomeAccountGeneralLedger.getBalanceSumDr()
                        .compareTo(incomeAccountGeneralLedger.getBalanceSumCr()) == 1) {
                    cashBook.setTansactionCurrency(generalAccount.getGeneralAccountCurrency());
                    cashBook.setAmount(incomeAccountGeneralLedger.getBalanceSumDr()
                            .subtract(incomeAccountGeneralLedger.getBalanceSumCr()).doubleValue());
                    cashBook.setFromAccount(generalAccount);
                    cashBook.setToAccount(profitAndLossAccount);
                    cashBookServiceImpl.posting(cashBook);
                } else if (incomeAccountGeneralLedger.getBalanceSumDr()
                        .compareTo(incomeAccountGeneralLedger.getBalanceSumCr()) == -1) {
                    cashBook.setTansactionCurrency(generalAccount.getGeneralAccountCurrency());
                    cashBook.setAmount(incomeAccountGeneralLedger.getBalanceSumCr()
                            .subtract(incomeAccountGeneralLedger.getBalanceSumDr()).doubleValue());
                    cashBook.setFromAccount(profitAndLossAccount);
                    cashBook.setToAccount(generalAccount);
                    cashBookServiceImpl.posting(cashBook);
                }
            }
        }

        // move expenditure Accounts balances to the profit and loss Account
        List<GeneralAccount> expenditureAccounts = getAccountsServiceImpl.getAllExpenditureAccounts();
        for (GeneralAccount generalAccount : expenditureAccounts) {
            if (!generalLedgerServiceImpl.findOneByAccountLedgerId(generalAccount.getId()).isPresent()) {
                GeneralLedger expenditureAccountGeneralLedger = generalLedgerServiceImpl.findOneByAccountLedgerId(generalAccount.getId())
                        .get();
                if (expenditureAccountGeneralLedger.getBalanceSumDr()
                        .compareTo(expenditureAccountGeneralLedger.getBalanceSumCr()) == 1) {
                    cashBook.setTansactionCurrency(generalAccount.getGeneralAccountCurrency());
                    cashBook.setAmount(expenditureAccountGeneralLedger.getBalanceSumDr()
                            .subtract(expenditureAccountGeneralLedger.getBalanceSumCr()).doubleValue());
                    cashBook.setFromAccount(generalAccount);
                    cashBook.setToAccount(profitAndLossAccount);
                    cashBookServiceImpl.posting(cashBook);
                } else if (expenditureAccountGeneralLedger.getBalanceSumDr()
                        .compareTo(expenditureAccountGeneralLedger.getBalanceSumCr()) == -1) {
                    cashBook.setTansactionCurrency(generalAccount.getGeneralAccountCurrency());
                    cashBook.setAmount(expenditureAccountGeneralLedger.getBalanceSumCr()
                            .subtract(expenditureAccountGeneralLedger.getBalanceSumDr()).doubleValue());
                    cashBook.setFromAccount(profitAndLossAccount);
                    cashBook.setToAccount(generalAccount);
                    cashBookServiceImpl.posting(cashBook);
                }
            }
        }
        return true;
    }

}
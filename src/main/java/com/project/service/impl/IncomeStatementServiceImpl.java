package com.project.service.impl;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import com.mysql.fabric.xmlrpc.base.Params;
import com.project.domain.CashBook;
import com.project.domain.GeneralAccount;
import com.project.domain.GeneralLedger;
import com.project.service.IncomeStatementService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRSaver;

@Service
public class IncomeStatementServiceImpl implements IncomeStatementService {

    private final Logger log = LoggerFactory.getLogger(IncomeStatementServiceImpl.class);
    @Autowired
    DataSource dataSource;
    JasperReport jasperReport;
    JasperPrint jasperPrint;
    byte[] reportAsByte;

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
    Map<String, Object> params = new HashMap<>();


    @Override
    public boolean processStatementTransactions() {

        log.debug("Processing the Income Statement Transactions");

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
                GeneralLedger inventoryAccountGeneralLedger = generalLedgerServiceImpl
                        .findOneByAccountLedgerId(generalAccount.getId()).get();

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
                GeneralLedger incomeAccountGeneralLedger = generalLedgerServiceImpl
                        .findOneByAccountLedgerId(generalAccount.getId()).get();
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
                GeneralLedger expenditureAccountGeneralLedger = generalLedgerServiceImpl
                        .findOneByAccountLedgerId(generalAccount.getId()).get();
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

    @Override
    public byte[] getIncomeStatement() {

        log.debug("Request getIncomeStatment()");
        processStatementTransactions();
        try {
            compileReport();
            fillReport();
            reportAsByte = JasperExportManager.exportReportToPdf(jasperPrint);
            return reportAsByte;

        } catch (JRException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void compileReport() {
        try {
            InputStream stream = getClass().getResourceAsStream("/jasper-reports/IncomeStatement.jrxml");
            if (stream.available() == 0) {
                System.out.println("Stream is null");
            } else {
                jasperReport = JasperCompileManager.compileReport(stream);
                JRSaver.saveObject(jasperReport, "src/main/resources/jasper-reports/IncomeStatement.jasper");
                stream.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public JasperPrint fillReport() {
        try {
            params.put("profitAndLoss",profitAndLossAccount.getId());
            jasperPrint = JasperFillManager.fillReport(jasperReport, params, DataSourceUtils.getConnection(dataSource));
            dataSource.getConnection().close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jasperPrint;
    }

}
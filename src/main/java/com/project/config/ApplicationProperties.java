package com.project.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to General Accounting.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
    public boolean singleInventoryAccount;
    public String profitAndLossAccount;
    public String openInventoryAccount;
    public String closeInventoryAccount;
    public String salesAccount;
    public String purchaseAccount;
    public String returnInwardAccount;
    public String returnOutwardAccount;
    public String inventoryAccount;
    public List<String> incomeAccounts;
    public List<String> expenditureAccounts;


    public boolean isSingleInventoryAccount() {
        return this.singleInventoryAccount;
    }

    public boolean getSingleInventoryAccount() {
        return this.singleInventoryAccount;
    }

    public void setSingleInventoryAccount(boolean singleInventoryAccount) {
        this.singleInventoryAccount = singleInventoryAccount;
    }

    public String getProfitAndLossAccount() {
        return this.profitAndLossAccount;
    }

    public void setProfitAndLossAccount(String profitAndLossAccount) {
        this.profitAndLossAccount = profitAndLossAccount;
    }

    public String getOpenInventoryAccount() {
        return this.openInventoryAccount;
    }

    public void setOpenInventoryAccount(String openInventoryAccount) {
        this.openInventoryAccount = openInventoryAccount;
    }

    public String getCloseInventoryAccount() {
        return this.closeInventoryAccount;
    }

    public void setCloseInventoryAccount(String closeInventoryAccount) {
        this.closeInventoryAccount = closeInventoryAccount;
    }

    public String getSalesAccount() {
        return this.salesAccount;
    }

    public void setSalesAccount(String salesAccount) {
        this.salesAccount = salesAccount;
    }

    public String getPurchaseAccount() {
        return this.purchaseAccount;
    }

    public void setPurchaseAccount(String purchaseAccount) {
        this.purchaseAccount = purchaseAccount;
    }

    public String getReturnInwardAccount() {
        return this.returnInwardAccount;
    }

    public void setReturnInwardAccount(String returnInwardAccount) {
        this.returnInwardAccount = returnInwardAccount;
    }

    public String getReturnOutwardAccount() {
        return this.returnOutwardAccount;
    }

    public void setReturnOutwardAccount(String returnOutwardAccount) {
        this.returnOutwardAccount = returnOutwardAccount;
    }

    public String getInventoryAccount() {
        return this.inventoryAccount;
    }

    public void setInventoryAccount(String inventoryAccount) {
        this.inventoryAccount = inventoryAccount;
    }

    public List<String> getIncomeAccounts() {
        return this.incomeAccounts;
    }

    public void setIncomeAccounts(List<String> incomeAccounts) {
        this.incomeAccounts = incomeAccounts;
    }

    public List<String> getExpenditureAccounts() {
        return this.expenditureAccounts;
    }

    public void setExpenditureAccounts(List<String> expenditureAccounts) {
        this.expenditureAccounts = expenditureAccounts;
    }

  
   
    

}

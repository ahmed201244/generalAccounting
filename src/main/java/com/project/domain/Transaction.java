package com.project.domain;

import java.util.List;

import com.project.domain.enumeration.TransactionType;

public interface Transaction {
    public List<CashBook> getTransactions(GeneralAccount fromAccount, GeneralAccount toAccount,Double amount);
    public TransactionType getTransactionType(GeneralAccount fromAccount, GeneralAccount toAccount);
    public Boolean checkCurrency(GeneralAccount fromAccount, GeneralAccount toAccount);
}

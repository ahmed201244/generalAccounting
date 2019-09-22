package com.project.domain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.project.domain.enumeration.AccountType;
import com.project.domain.enumeration.TransactionType;

public class IncomeToCaptialTransaction implements Transaction {
    

    @Override
    public List<CashBook> getTransactions(GeneralAccount fromAccount, GeneralAccount toAccount, Double amount) {
        CashBook transaction = new CashBook();
        CashBook transaction2 = new CashBook();
         List<CashBook> transactions = new ArrayList<>() ;

        if (fromAccount == null && toAccount ==null) return null ;
        //Initialize the first entry
        transaction.setDate(Instant.now());
        transaction.setAmount(amount);
        transaction.setUuid(UUID.randomUUID().toString());
        System.out.println("checkCurrency(fromAccount, toAccount)"+checkCurrency(fromAccount, toAccount));
        if (checkCurrency(fromAccount, toAccount)) {
            transaction.setTansactionCurrency(fromAccount.getGeneralAccountCurrency());
        }
        transaction.setFromAccount(fromAccount);
        transaction.setTransactionType(getTransactionType(fromAccount, null));
        transaction.setToAccount(toAccount);

        transactions.add(transaction);
        //Initialize the second entry
        transaction2.setDate(transaction.getDate());
        transaction2.setAmount(amount);
        transaction2.setUuid(transaction.getUuid());
        if (checkCurrency(fromAccount, toAccount)) {
            transaction2.setTansactionCurrency(fromAccount.getGeneralAccountCurrency());
        }
        transaction2.setFromAccount(toAccount);
        transaction2.setToAccount(fromAccount);
        transaction2.setTransactionType(getTransactionType(null, toAccount));
        transactions.add(transaction2);

        return transactions;

    }

    @Override
    public TransactionType getTransactionType(GeneralAccount fromAccount, GeneralAccount toAccount) {
        if (fromAccount != null) {
            if (fromAccount.getType() == AccountType.INCOME) {
                return TransactionType.CREDIT;
            } 
        }
        if (toAccount != null) {
           
             if (toAccount.getType() == AccountType.CAPITAL) {
                return TransactionType.DEBIT;
            } 
        }

        return null;

    }

    public Boolean checkCurrency(GeneralAccount fromAccount, GeneralAccount toAccount) {
      
        if (fromAccount.getGeneralAccountCurrency().equals(toAccount.getGeneralAccountCurrency()) ) {
            System.out.println("fromAccount.getGeneralAccountCurrency()"+fromAccount.getGeneralAccountCurrency());
            System.out.println("toAccount.getGeneralAccountCurrency()"+toAccount.getGeneralAccountCurrency());
            return true;
        } else {
            return false;
        }
    }

}
package com.project.exception;

public class CurrencyMismatchException extends Exception {
    
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public CurrencyMismatchException(String fromAccount, String toAccount) {
        super("Currency Mismatch between: "+ fromAccount +" and "+ toAccount);
        super.printStackTrace();
    }
    
}
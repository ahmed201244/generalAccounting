package com.project.service;

import net.sf.jasperreports.engine.JasperPrint;

public interface IncomeStatementService {
    public boolean processStatementTransactions();

    public byte[] getIncomeStatement();

    public void compileReport();

    public JasperPrint fillReport();
}
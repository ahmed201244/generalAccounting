package com.project.service;

import net.sf.jasperreports.engine.JasperPrint;

public interface BalanceSheetService {
    public byte[] getBalanceSheet();

    public void compileReport();

    public JasperPrint fillReport();

}

package com.project.service.impl;

import java.io.InputStream;

import javax.sql.DataSource;

import com.project.service.BalanceSheetService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
public class BalanceSheetServiceImpl implements BalanceSheetService {

    private final Logger log = LoggerFactory.getLogger(BalanceSheetServiceImpl.class);
    @Autowired
    DataSource dataSource;
    JasperReport jasperReport;
    JasperPrint jasperPrint;
    byte[] reportAsByte;

    @Override
    public byte[] getBalanceSheet() {
        log.debug("Request getBalanceSheet()");
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
            InputStream stream = getClass().getResourceAsStream("/jasper-reports/BalanceSheet.jrxml");
            if (stream.available() == 0) {
                System.out.println("Stream is null");
            } else {
                jasperReport = JasperCompileManager.compileReport(stream);
                JRSaver.saveObject(jasperReport, "src/main/resources/jasper-reports/BalanceSheet.jasper");
                stream.close();

            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public JasperPrint fillReport() {
        try {
            jasperPrint = JasperFillManager.fillReport(jasperReport, null, DataSourceUtils.getConnection(dataSource));
            dataSource.getConnection().close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return jasperPrint;
    }

}

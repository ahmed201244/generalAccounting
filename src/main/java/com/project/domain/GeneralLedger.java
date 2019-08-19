package com.project.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A GeneralLedger.
 */
@Entity
@Table(name = "general_ledger")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GeneralLedger implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private Instant date;

    @Column(name = "transactions_sum_dr", precision = 10, scale = 2)
    private BigDecimal transactionsSumDr;

    @Column(name = "transactions_sum_cr", precision = 10, scale = 2)
    private BigDecimal transactionsSumCr;

    @Column(name = "balance_sum_dr", precision = 10, scale = 2)
    private BigDecimal balanceSumDr;

    @Column(name = "balance_sum_cr", precision = 10, scale = 2)
    private BigDecimal balanceSumCr;

    @OneToOne
    @JoinColumn(unique = false)
    private GeneralAccount accountLedger;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public GeneralLedger date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public BigDecimal getTransactionsSumDr() {
        return transactionsSumDr;
    }

    public GeneralLedger transactionsSumDr(BigDecimal transactionsSumDr) {
        this.transactionsSumDr = transactionsSumDr;
        return this;
    }

    public void setTransactionsSumDr(BigDecimal transactionsSumDr) {
        this.transactionsSumDr = transactionsSumDr;
    }

    public BigDecimal getTransactionsSumCr() {
        return transactionsSumCr;
    }

    public GeneralLedger transactionsSumCr(BigDecimal transactionsSumCr) {
        this.transactionsSumCr = transactionsSumCr;
        return this;
    }

    public void setTransactionsSumCr(BigDecimal transactionsSumCr) {
        this.transactionsSumCr = transactionsSumCr;
    }

    public BigDecimal getBalanceSumDr() {
        return balanceSumDr;
    }

    public GeneralLedger balanceSumDr(BigDecimal balanceSumDr) {
        this.balanceSumDr = balanceSumDr;
        return this;
    }

    public void setBalanceSumDr(BigDecimal balanceSumDr) {
        this.balanceSumDr = balanceSumDr;
    }

    public BigDecimal getBalanceSumCr() {
        return balanceSumCr;
    }

    public GeneralLedger balanceSumCr(BigDecimal balanceSumCr) {
        this.balanceSumCr = balanceSumCr;
        return this;
    }

    public void setBalanceSumCr(BigDecimal balanceSumCr) {
        this.balanceSumCr = balanceSumCr;
    }

    public GeneralAccount getAccountLedger() {
        return accountLedger;
    }

    public GeneralLedger accountLedger(GeneralAccount generalAccount) {
        this.accountLedger = generalAccount;
        return this;
    }

    public void setAccountLedger(GeneralAccount generalAccount) {
        this.accountLedger = generalAccount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GeneralLedger generalLedger = (GeneralLedger) o;
        if (generalLedger.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), generalLedger.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GeneralLedger{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", transactionsSumDr=" + getTransactionsSumDr() +
            ", transactionsSumCr=" + getTransactionsSumCr() +
            ", balanceSumDr=" + getBalanceSumDr() +
            ", balanceSumCr=" + getBalanceSumCr() +
            "}";
    }
}

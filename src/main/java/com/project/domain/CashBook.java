package com.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.project.domain.enumeration.TransactionType;

/**
 * A CashBook.
 */
@Entity
@Table(name = "cash_book")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CashBook implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private Instant date;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type")
    private TransactionType transactionType;

    @Column(name = "uuid")
    private String uuid;

    @ManyToOne
    @JsonIgnoreProperties("cashBooks")
    private Currency tansactionCurrency;

    @ManyToOne
    @JsonIgnoreProperties("cashBooks")
    private GeneralAccount fromAccount;

    @ManyToOne
    @JsonIgnoreProperties("cashBooks")
    private GeneralAccount toAccount;

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

    public CashBook date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public CashBook amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public CashBook transactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
        return this;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public String getUuid() {
        return uuid;
    }

    public CashBook uuid(String uuid) {
        this.uuid = uuid;
        return this;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Currency getTansactionCurrency() {
        return tansactionCurrency;
    }

    public CashBook tansactionCurrency(Currency currency) {
        this.tansactionCurrency = currency;
        return this;
    }

    public void setTansactionCurrency(Currency currency) {
        this.tansactionCurrency = currency;
    }

    public GeneralAccount getFromAccount() {
        return fromAccount;
    }

    public CashBook fromAccount(GeneralAccount generalAccount) {
        this.fromAccount = generalAccount;
        return this;
    }

    public void setFromAccount(GeneralAccount generalAccount) {
        this.fromAccount = generalAccount;
    }

    public GeneralAccount getToAccount() {
        return toAccount;
    }

    public CashBook toAccount(GeneralAccount generalAccount) {
        this.toAccount = generalAccount;
        return this;
    }

    public void setToAccount(GeneralAccount generalAccount) {
        this.toAccount = generalAccount;
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
        CashBook cashBook = (CashBook) o;
        if (cashBook.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cashBook.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", date='" + getDate() + "'" +
            ", amount='" + getAmount() + "'" +
            ", transactionType='" + getTransactionType() + "'" +
            ", uuid='" + getUuid() + "'" +
            ", tansactionCurrency='" + getTansactionCurrency() + "'" +
            ", fromAccount='" + getFromAccount() + "'" +
            ", toAccount='" + getToAccount() + "'" +
            "}";
    }
    
}

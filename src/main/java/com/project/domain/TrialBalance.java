package com.project.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A TrialBalance.
 */
@Entity
@Table(name = "trial_balance")
@Cache(usage = CacheConcurrencyStrategy.TRANSACTIONAL)
public class TrialBalance implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "debit", precision = 10, scale = 2)
    private BigDecimal debit;

    @Column(name = "credit", precision = 10, scale = 2)
    private BigDecimal credit;

    @OneToOne
    @JoinColumn(unique = true)
    private GeneralAccount trialBalance;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getDebit() {
        return debit;
    }

    public TrialBalance debit(BigDecimal debit) {
        this.debit = debit;
        return this;
    }

    public void setDebit(BigDecimal debit) {
        this.debit = debit;
    }

    public BigDecimal getCredit() {
        return credit;
    }

    public TrialBalance credit(BigDecimal credit) {
        this.credit = credit;
        return this;
    }

    public void setCredit(BigDecimal credit) {
        this.credit = credit;
    }

    public GeneralAccount getTrialBalance() {
        return trialBalance;
    }

    public TrialBalance trialBalance(GeneralAccount generalAccount) {
        this.trialBalance = generalAccount;
        return this;
    }

    public void setTrialBalance(GeneralAccount generalAccount) {
        this.trialBalance = generalAccount;
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
        TrialBalance trialBalance = (TrialBalance) o;
        if (trialBalance.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), trialBalance.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", debit='" + getDebit() + "'" +
            ", credit='" + getCredit() + "'" +
            ", trialBalance='" + getTrialBalance() + "'" +
            "}";
    }
    
}

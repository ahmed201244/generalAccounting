package com.project.repository;

import com.project.domain.GeneralAccount;
import com.project.domain.enumeration.AccountType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data repository for the GeneralAccount entity.
 */
// @SuppressWarnings("unused")
@Repository
public interface GeneralAccountRepository extends JpaRepository<GeneralAccount, Long> {

    Optional<GeneralAccount> findByCode(String code);
    List<GeneralAccount> findByType(AccountType type);
}

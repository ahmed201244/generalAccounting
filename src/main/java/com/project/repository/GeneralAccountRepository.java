package com.project.repository;

import com.project.domain.GeneralAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GeneralAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GeneralAccountRepository extends JpaRepository<GeneralAccount, Long> {

}

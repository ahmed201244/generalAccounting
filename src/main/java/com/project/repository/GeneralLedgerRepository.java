package com.project.repository;

import com.project.domain.GeneralLedger;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GeneralLedger entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GeneralLedgerRepository extends JpaRepository<GeneralLedger, Long> {

}

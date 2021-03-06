package com.project.repository;

import java.util.Optional;

import com.project.domain.Currency;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Currency entity.
 */
// @SuppressWarnings("unused")
@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Long> {
    Optional<Currency> findOneByCode(String code);

}

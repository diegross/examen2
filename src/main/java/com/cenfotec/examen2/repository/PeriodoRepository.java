package com.cenfotec.examen2.repository;
import com.cenfotec.examen2.domain.Periodo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Periodo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PeriodoRepository extends JpaRepository<Periodo, Long> {

}

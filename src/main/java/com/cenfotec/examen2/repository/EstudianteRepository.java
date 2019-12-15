package com.cenfotec.examen2.repository;
import com.cenfotec.examen2.domain.Estudiante;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Estudiante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {

}

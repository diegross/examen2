package com.cenfotec.examen2.web.rest;

import com.cenfotec.examen2.domain.Periodo;
import com.cenfotec.examen2.repository.PeriodoRepository;
import com.cenfotec.examen2.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.cenfotec.examen2.domain.Periodo}.
 */
@RestController
@RequestMapping("/api")
public class PeriodoResource {

    private final Logger log = LoggerFactory.getLogger(PeriodoResource.class);

    private static final String ENTITY_NAME = "periodo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PeriodoRepository periodoRepository;

    public PeriodoResource(PeriodoRepository periodoRepository) {
        this.periodoRepository = periodoRepository;
    }

    /**
     * {@code POST  /periodos} : Create a new periodo.
     *
     * @param periodo the periodo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new periodo, or with status {@code 400 (Bad Request)} if the periodo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/periodos")
    public ResponseEntity<Periodo> createPeriodo(@RequestBody Periodo periodo) throws URISyntaxException {
        log.debug("REST request to save Periodo : {}", periodo);
        if (periodo.getId() != null) {
            throw new BadRequestAlertException("A new periodo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Periodo result = periodoRepository.save(periodo);
        return ResponseEntity.created(new URI("/api/periodos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /periodos} : Updates an existing periodo.
     *
     * @param periodo the periodo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated periodo,
     * or with status {@code 400 (Bad Request)} if the periodo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the periodo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/periodos")
    public ResponseEntity<Periodo> updatePeriodo(@RequestBody Periodo periodo) throws URISyntaxException {
        log.debug("REST request to update Periodo : {}", periodo);
        if (periodo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Periodo result = periodoRepository.save(periodo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, periodo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /periodos} : get all the periodos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of periodos in body.
     */
    @GetMapping("/periodos")
    public List<Periodo> getAllPeriodos() {
        log.debug("REST request to get all Periodos");
        return periodoRepository.findAll();
    }

    /**
     * {@code GET  /periodos/:id} : get the "id" periodo.
     *
     * @param id the id of the periodo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the periodo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/periodos/{id}")
    public ResponseEntity<Periodo> getPeriodo(@PathVariable Long id) {
        log.debug("REST request to get Periodo : {}", id);
        Optional<Periodo> periodo = periodoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(periodo);
    }

    /**
     * {@code DELETE  /periodos/:id} : delete the "id" periodo.
     *
     * @param id the id of the periodo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/periodos/{id}")
    public ResponseEntity<Void> deletePeriodo(@PathVariable Long id) {
        log.debug("REST request to delete Periodo : {}", id);
        periodoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}

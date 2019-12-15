package com.cenfotec.examen2.web.rest;

import com.cenfotec.examen2.Examen2Proyecto3App;
import com.cenfotec.examen2.domain.Periodo;
import com.cenfotec.examen2.repository.PeriodoRepository;
import com.cenfotec.examen2.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.cenfotec.examen2.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PeriodoResource} REST controller.
 */
@SpringBootTest(classes = Examen2Proyecto3App.class)
public class PeriodoResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    @Autowired
    private PeriodoRepository periodoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPeriodoMockMvc;

    private Periodo periodo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PeriodoResource periodoResource = new PeriodoResource(periodoRepository);
        this.restPeriodoMockMvc = MockMvcBuilders.standaloneSetup(periodoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Periodo createEntity(EntityManager em) {
        Periodo periodo = new Periodo()
            .nombre(DEFAULT_NOMBRE)
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN)
            .estado(DEFAULT_ESTADO);
        return periodo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Periodo createUpdatedEntity(EntityManager em) {
        Periodo periodo = new Periodo()
            .nombre(UPDATED_NOMBRE)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .estado(UPDATED_ESTADO);
        return periodo;
    }

    @BeforeEach
    public void initTest() {
        periodo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPeriodo() throws Exception {
        int databaseSizeBeforeCreate = periodoRepository.findAll().size();

        // Create the Periodo
        restPeriodoMockMvc.perform(post("/api/periodos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodo)))
            .andExpect(status().isCreated());

        // Validate the Periodo in the database
        List<Periodo> periodoList = periodoRepository.findAll();
        assertThat(periodoList).hasSize(databaseSizeBeforeCreate + 1);
        Periodo testPeriodo = periodoList.get(periodoList.size() - 1);
        assertThat(testPeriodo.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPeriodo.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testPeriodo.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
        assertThat(testPeriodo.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createPeriodoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = periodoRepository.findAll().size();

        // Create the Periodo with an existing ID
        periodo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPeriodoMockMvc.perform(post("/api/periodos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodo)))
            .andExpect(status().isBadRequest());

        // Validate the Periodo in the database
        List<Periodo> periodoList = periodoRepository.findAll();
        assertThat(periodoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPeriodos() throws Exception {
        // Initialize the database
        periodoRepository.saveAndFlush(periodo);

        // Get all the periodoList
        restPeriodoMockMvc.perform(get("/api/periodos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(periodo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }
    
    @Test
    @Transactional
    public void getPeriodo() throws Exception {
        // Initialize the database
        periodoRepository.saveAndFlush(periodo);

        // Get the periodo
        restPeriodoMockMvc.perform(get("/api/periodos/{id}", periodo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(periodo.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    public void getNonExistingPeriodo() throws Exception {
        // Get the periodo
        restPeriodoMockMvc.perform(get("/api/periodos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePeriodo() throws Exception {
        // Initialize the database
        periodoRepository.saveAndFlush(periodo);

        int databaseSizeBeforeUpdate = periodoRepository.findAll().size();

        // Update the periodo
        Periodo updatedPeriodo = periodoRepository.findById(periodo.getId()).get();
        // Disconnect from session so that the updates on updatedPeriodo are not directly saved in db
        em.detach(updatedPeriodo);
        updatedPeriodo
            .nombre(UPDATED_NOMBRE)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .estado(UPDATED_ESTADO);

        restPeriodoMockMvc.perform(put("/api/periodos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPeriodo)))
            .andExpect(status().isOk());

        // Validate the Periodo in the database
        List<Periodo> periodoList = periodoRepository.findAll();
        assertThat(periodoList).hasSize(databaseSizeBeforeUpdate);
        Periodo testPeriodo = periodoList.get(periodoList.size() - 1);
        assertThat(testPeriodo.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPeriodo.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testPeriodo.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
        assertThat(testPeriodo.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingPeriodo() throws Exception {
        int databaseSizeBeforeUpdate = periodoRepository.findAll().size();

        // Create the Periodo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPeriodoMockMvc.perform(put("/api/periodos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodo)))
            .andExpect(status().isBadRequest());

        // Validate the Periodo in the database
        List<Periodo> periodoList = periodoRepository.findAll();
        assertThat(periodoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePeriodo() throws Exception {
        // Initialize the database
        periodoRepository.saveAndFlush(periodo);

        int databaseSizeBeforeDelete = periodoRepository.findAll().size();

        // Delete the periodo
        restPeriodoMockMvc.perform(delete("/api/periodos/{id}", periodo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Periodo> periodoList = periodoRepository.findAll();
        assertThat(periodoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Periodo.class);
        Periodo periodo1 = new Periodo();
        periodo1.setId(1L);
        Periodo periodo2 = new Periodo();
        periodo2.setId(periodo1.getId());
        assertThat(periodo1).isEqualTo(periodo2);
        periodo2.setId(2L);
        assertThat(periodo1).isNotEqualTo(periodo2);
        periodo1.setId(null);
        assertThat(periodo1).isNotEqualTo(periodo2);
    }
}

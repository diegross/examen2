package com.cenfotec.examen2.web.rest;

import com.cenfotec.examen2.Examen2Proyecto3App;
import com.cenfotec.examen2.domain.Profesor;
import com.cenfotec.examen2.repository.ProfesorRepository;
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
 * Integration tests for the {@link ProfesorResource} REST controller.
 */
@SpringBootTest(classes = Examen2Proyecto3App.class)
public class ProfesorResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_PRIMER_APELLIDO = "AAAAAAAAAA";
    private static final String UPDATED_PRIMER_APELLIDO = "BBBBBBBBBB";

    private static final String DEFAULT_SEGUNDO_APELLIDO = "AAAAAAAAAA";
    private static final String UPDATED_SEGUNDO_APELLIDO = "BBBBBBBBBB";

    private static final String DEFAULT_GENERO = "AAAAAAAAAA";
    private static final String UPDATED_GENERO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_NACIMIENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_NACIMIENTO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_CONTRATACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CONTRATACION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ProfesorRepository profesorRepository;

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

    private MockMvc restProfesorMockMvc;

    private Profesor profesor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfesorResource profesorResource = new ProfesorResource(profesorRepository);
        this.restProfesorMockMvc = MockMvcBuilders.standaloneSetup(profesorResource)
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
    public static Profesor createEntity(EntityManager em) {
        Profesor profesor = new Profesor()
            .nombre(DEFAULT_NOMBRE)
            .primerApellido(DEFAULT_PRIMER_APELLIDO)
            .segundoApellido(DEFAULT_SEGUNDO_APELLIDO)
            .genero(DEFAULT_GENERO)
            .fechaNacimiento(DEFAULT_FECHA_NACIMIENTO)
            .fechaContratacion(DEFAULT_FECHA_CONTRATACION);
        return profesor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profesor createUpdatedEntity(EntityManager em) {
        Profesor profesor = new Profesor()
            .nombre(UPDATED_NOMBRE)
            .primerApellido(UPDATED_PRIMER_APELLIDO)
            .segundoApellido(UPDATED_SEGUNDO_APELLIDO)
            .genero(UPDATED_GENERO)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .fechaContratacion(UPDATED_FECHA_CONTRATACION);
        return profesor;
    }

    @BeforeEach
    public void initTest() {
        profesor = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfesor() throws Exception {
        int databaseSizeBeforeCreate = profesorRepository.findAll().size();

        // Create the Profesor
        restProfesorMockMvc.perform(post("/api/profesors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profesor)))
            .andExpect(status().isCreated());

        // Validate the Profesor in the database
        List<Profesor> profesorList = profesorRepository.findAll();
        assertThat(profesorList).hasSize(databaseSizeBeforeCreate + 1);
        Profesor testProfesor = profesorList.get(profesorList.size() - 1);
        assertThat(testProfesor.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testProfesor.getPrimerApellido()).isEqualTo(DEFAULT_PRIMER_APELLIDO);
        assertThat(testProfesor.getSegundoApellido()).isEqualTo(DEFAULT_SEGUNDO_APELLIDO);
        assertThat(testProfesor.getGenero()).isEqualTo(DEFAULT_GENERO);
        assertThat(testProfesor.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
        assertThat(testProfesor.getFechaContratacion()).isEqualTo(DEFAULT_FECHA_CONTRATACION);
    }

    @Test
    @Transactional
    public void createProfesorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profesorRepository.findAll().size();

        // Create the Profesor with an existing ID
        profesor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfesorMockMvc.perform(post("/api/profesors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profesor)))
            .andExpect(status().isBadRequest());

        // Validate the Profesor in the database
        List<Profesor> profesorList = profesorRepository.findAll();
        assertThat(profesorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProfesors() throws Exception {
        // Initialize the database
        profesorRepository.saveAndFlush(profesor);

        // Get all the profesorList
        restProfesorMockMvc.perform(get("/api/profesors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profesor.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].primerApellido").value(hasItem(DEFAULT_PRIMER_APELLIDO)))
            .andExpect(jsonPath("$.[*].segundoApellido").value(hasItem(DEFAULT_SEGUNDO_APELLIDO)))
            .andExpect(jsonPath("$.[*].genero").value(hasItem(DEFAULT_GENERO)))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].fechaContratacion").value(hasItem(DEFAULT_FECHA_CONTRATACION.toString())));
    }
    
    @Test
    @Transactional
    public void getProfesor() throws Exception {
        // Initialize the database
        profesorRepository.saveAndFlush(profesor);

        // Get the profesor
        restProfesorMockMvc.perform(get("/api/profesors/{id}", profesor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(profesor.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.primerApellido").value(DEFAULT_PRIMER_APELLIDO))
            .andExpect(jsonPath("$.segundoApellido").value(DEFAULT_SEGUNDO_APELLIDO))
            .andExpect(jsonPath("$.genero").value(DEFAULT_GENERO))
            .andExpect(jsonPath("$.fechaNacimiento").value(DEFAULT_FECHA_NACIMIENTO.toString()))
            .andExpect(jsonPath("$.fechaContratacion").value(DEFAULT_FECHA_CONTRATACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProfesor() throws Exception {
        // Get the profesor
        restProfesorMockMvc.perform(get("/api/profesors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfesor() throws Exception {
        // Initialize the database
        profesorRepository.saveAndFlush(profesor);

        int databaseSizeBeforeUpdate = profesorRepository.findAll().size();

        // Update the profesor
        Profesor updatedProfesor = profesorRepository.findById(profesor.getId()).get();
        // Disconnect from session so that the updates on updatedProfesor are not directly saved in db
        em.detach(updatedProfesor);
        updatedProfesor
            .nombre(UPDATED_NOMBRE)
            .primerApellido(UPDATED_PRIMER_APELLIDO)
            .segundoApellido(UPDATED_SEGUNDO_APELLIDO)
            .genero(UPDATED_GENERO)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .fechaContratacion(UPDATED_FECHA_CONTRATACION);

        restProfesorMockMvc.perform(put("/api/profesors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfesor)))
            .andExpect(status().isOk());

        // Validate the Profesor in the database
        List<Profesor> profesorList = profesorRepository.findAll();
        assertThat(profesorList).hasSize(databaseSizeBeforeUpdate);
        Profesor testProfesor = profesorList.get(profesorList.size() - 1);
        assertThat(testProfesor.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testProfesor.getPrimerApellido()).isEqualTo(UPDATED_PRIMER_APELLIDO);
        assertThat(testProfesor.getSegundoApellido()).isEqualTo(UPDATED_SEGUNDO_APELLIDO);
        assertThat(testProfesor.getGenero()).isEqualTo(UPDATED_GENERO);
        assertThat(testProfesor.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
        assertThat(testProfesor.getFechaContratacion()).isEqualTo(UPDATED_FECHA_CONTRATACION);
    }

    @Test
    @Transactional
    public void updateNonExistingProfesor() throws Exception {
        int databaseSizeBeforeUpdate = profesorRepository.findAll().size();

        // Create the Profesor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfesorMockMvc.perform(put("/api/profesors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profesor)))
            .andExpect(status().isBadRequest());

        // Validate the Profesor in the database
        List<Profesor> profesorList = profesorRepository.findAll();
        assertThat(profesorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfesor() throws Exception {
        // Initialize the database
        profesorRepository.saveAndFlush(profesor);

        int databaseSizeBeforeDelete = profesorRepository.findAll().size();

        // Delete the profesor
        restProfesorMockMvc.perform(delete("/api/profesors/{id}", profesor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Profesor> profesorList = profesorRepository.findAll();
        assertThat(profesorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Profesor.class);
        Profesor profesor1 = new Profesor();
        profesor1.setId(1L);
        Profesor profesor2 = new Profesor();
        profesor2.setId(profesor1.getId());
        assertThat(profesor1).isEqualTo(profesor2);
        profesor2.setId(2L);
        assertThat(profesor1).isNotEqualTo(profesor2);
        profesor1.setId(null);
        assertThat(profesor1).isNotEqualTo(profesor2);
    }
}

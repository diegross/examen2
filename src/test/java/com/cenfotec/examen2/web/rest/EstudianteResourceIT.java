package com.cenfotec.examen2.web.rest;

import com.cenfotec.examen2.Examen2Proyecto3App;
import com.cenfotec.examen2.domain.Estudiante;
import com.cenfotec.examen2.repository.EstudianteRepository;
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
 * Integration tests for the {@link EstudianteResource} REST controller.
 */
@SpringBootTest(classes = Examen2Proyecto3App.class)
public class EstudianteResourceIT {

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

    @Autowired
    private EstudianteRepository estudianteRepository;

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

    private MockMvc restEstudianteMockMvc;

    private Estudiante estudiante;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstudianteResource estudianteResource = new EstudianteResource(estudianteRepository);
        this.restEstudianteMockMvc = MockMvcBuilders.standaloneSetup(estudianteResource)
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
    public static Estudiante createEntity(EntityManager em) {
        Estudiante estudiante = new Estudiante()
            .nombre(DEFAULT_NOMBRE)
            .primerApellido(DEFAULT_PRIMER_APELLIDO)
            .segundoApellido(DEFAULT_SEGUNDO_APELLIDO)
            .genero(DEFAULT_GENERO)
            .fechaNacimiento(DEFAULT_FECHA_NACIMIENTO);
        return estudiante;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estudiante createUpdatedEntity(EntityManager em) {
        Estudiante estudiante = new Estudiante()
            .nombre(UPDATED_NOMBRE)
            .primerApellido(UPDATED_PRIMER_APELLIDO)
            .segundoApellido(UPDATED_SEGUNDO_APELLIDO)
            .genero(UPDATED_GENERO)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO);
        return estudiante;
    }

    @BeforeEach
    public void initTest() {
        estudiante = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstudiante() throws Exception {
        int databaseSizeBeforeCreate = estudianteRepository.findAll().size();

        // Create the Estudiante
        restEstudianteMockMvc.perform(post("/api/estudiantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estudiante)))
            .andExpect(status().isCreated());

        // Validate the Estudiante in the database
        List<Estudiante> estudianteList = estudianteRepository.findAll();
        assertThat(estudianteList).hasSize(databaseSizeBeforeCreate + 1);
        Estudiante testEstudiante = estudianteList.get(estudianteList.size() - 1);
        assertThat(testEstudiante.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEstudiante.getPrimerApellido()).isEqualTo(DEFAULT_PRIMER_APELLIDO);
        assertThat(testEstudiante.getSegundoApellido()).isEqualTo(DEFAULT_SEGUNDO_APELLIDO);
        assertThat(testEstudiante.getGenero()).isEqualTo(DEFAULT_GENERO);
        assertThat(testEstudiante.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void createEstudianteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estudianteRepository.findAll().size();

        // Create the Estudiante with an existing ID
        estudiante.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstudianteMockMvc.perform(post("/api/estudiantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estudiante)))
            .andExpect(status().isBadRequest());

        // Validate the Estudiante in the database
        List<Estudiante> estudianteList = estudianteRepository.findAll();
        assertThat(estudianteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEstudiantes() throws Exception {
        // Initialize the database
        estudianteRepository.saveAndFlush(estudiante);

        // Get all the estudianteList
        restEstudianteMockMvc.perform(get("/api/estudiantes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estudiante.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].primerApellido").value(hasItem(DEFAULT_PRIMER_APELLIDO)))
            .andExpect(jsonPath("$.[*].segundoApellido").value(hasItem(DEFAULT_SEGUNDO_APELLIDO)))
            .andExpect(jsonPath("$.[*].genero").value(hasItem(DEFAULT_GENERO)))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())));
    }
    
    @Test
    @Transactional
    public void getEstudiante() throws Exception {
        // Initialize the database
        estudianteRepository.saveAndFlush(estudiante);

        // Get the estudiante
        restEstudianteMockMvc.perform(get("/api/estudiantes/{id}", estudiante.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estudiante.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.primerApellido").value(DEFAULT_PRIMER_APELLIDO))
            .andExpect(jsonPath("$.segundoApellido").value(DEFAULT_SEGUNDO_APELLIDO))
            .andExpect(jsonPath("$.genero").value(DEFAULT_GENERO))
            .andExpect(jsonPath("$.fechaNacimiento").value(DEFAULT_FECHA_NACIMIENTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEstudiante() throws Exception {
        // Get the estudiante
        restEstudianteMockMvc.perform(get("/api/estudiantes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstudiante() throws Exception {
        // Initialize the database
        estudianteRepository.saveAndFlush(estudiante);

        int databaseSizeBeforeUpdate = estudianteRepository.findAll().size();

        // Update the estudiante
        Estudiante updatedEstudiante = estudianteRepository.findById(estudiante.getId()).get();
        // Disconnect from session so that the updates on updatedEstudiante are not directly saved in db
        em.detach(updatedEstudiante);
        updatedEstudiante
            .nombre(UPDATED_NOMBRE)
            .primerApellido(UPDATED_PRIMER_APELLIDO)
            .segundoApellido(UPDATED_SEGUNDO_APELLIDO)
            .genero(UPDATED_GENERO)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO);

        restEstudianteMockMvc.perform(put("/api/estudiantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstudiante)))
            .andExpect(status().isOk());

        // Validate the Estudiante in the database
        List<Estudiante> estudianteList = estudianteRepository.findAll();
        assertThat(estudianteList).hasSize(databaseSizeBeforeUpdate);
        Estudiante testEstudiante = estudianteList.get(estudianteList.size() - 1);
        assertThat(testEstudiante.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEstudiante.getPrimerApellido()).isEqualTo(UPDATED_PRIMER_APELLIDO);
        assertThat(testEstudiante.getSegundoApellido()).isEqualTo(UPDATED_SEGUNDO_APELLIDO);
        assertThat(testEstudiante.getGenero()).isEqualTo(UPDATED_GENERO);
        assertThat(testEstudiante.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstudiante() throws Exception {
        int databaseSizeBeforeUpdate = estudianteRepository.findAll().size();

        // Create the Estudiante

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstudianteMockMvc.perform(put("/api/estudiantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estudiante)))
            .andExpect(status().isBadRequest());

        // Validate the Estudiante in the database
        List<Estudiante> estudianteList = estudianteRepository.findAll();
        assertThat(estudianteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstudiante() throws Exception {
        // Initialize the database
        estudianteRepository.saveAndFlush(estudiante);

        int databaseSizeBeforeDelete = estudianteRepository.findAll().size();

        // Delete the estudiante
        restEstudianteMockMvc.perform(delete("/api/estudiantes/{id}", estudiante.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Estudiante> estudianteList = estudianteRepository.findAll();
        assertThat(estudianteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Estudiante.class);
        Estudiante estudiante1 = new Estudiante();
        estudiante1.setId(1L);
        Estudiante estudiante2 = new Estudiante();
        estudiante2.setId(estudiante1.getId());
        assertThat(estudiante1).isEqualTo(estudiante2);
        estudiante2.setId(2L);
        assertThat(estudiante1).isNotEqualTo(estudiante2);
        estudiante1.setId(null);
        assertThat(estudiante1).isNotEqualTo(estudiante2);
    }
}

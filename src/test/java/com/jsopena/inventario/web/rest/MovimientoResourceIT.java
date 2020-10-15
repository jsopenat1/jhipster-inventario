package com.jsopena.inventario.web.rest;

import com.jsopena.inventario.InventarioApp;
import com.jsopena.inventario.domain.Movimiento;
import com.jsopena.inventario.repository.MovimientoRepository;
import com.jsopena.inventario.service.MovimientoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MovimientoResource} REST controller.
 */
@SpringBootTest(classes = InventarioApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MovimientoResourceIT {

    private static final Instant DEFAULT_WHEN_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_WHEN_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_CANTIDAD = new BigDecimal(1);
    private static final BigDecimal UPDATED_CANTIDAD = new BigDecimal(2);

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private MovimientoService movimientoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMovimientoMockMvc;

    private Movimiento movimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movimiento createEntity(EntityManager em) {
        Movimiento movimiento = new Movimiento()
            .whenDate(DEFAULT_WHEN_DATE)
            .description(DEFAULT_DESCRIPTION)
            .cantidad(DEFAULT_CANTIDAD);
        return movimiento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movimiento createUpdatedEntity(EntityManager em) {
        Movimiento movimiento = new Movimiento()
            .whenDate(UPDATED_WHEN_DATE)
            .description(UPDATED_DESCRIPTION)
            .cantidad(UPDATED_CANTIDAD);
        return movimiento;
    }

    @BeforeEach
    public void initTest() {
        movimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createMovimiento() throws Exception {
        int databaseSizeBeforeCreate = movimientoRepository.findAll().size();
        // Create the Movimiento
        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isCreated());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeCreate + 1);
        Movimiento testMovimiento = movimientoList.get(movimientoList.size() - 1);
        assertThat(testMovimiento.getWhenDate()).isEqualTo(DEFAULT_WHEN_DATE);
        assertThat(testMovimiento.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMovimiento.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    public void createMovimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = movimientoRepository.findAll().size();

        // Create the Movimiento with an existing ID
        movimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkWhenDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = movimientoRepository.findAll().size();
        // set the field null
        movimiento.setWhenDate(null);

        // Create the Movimiento, which fails.


        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = movimientoRepository.findAll().size();
        // set the field null
        movimiento.setCantidad(null);

        // Create the Movimiento, which fails.


        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMovimientos() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        // Get all the movimientoList
        restMovimientoMockMvc.perform(get("/api/movimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].whenDate").value(hasItem(DEFAULT_WHEN_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())));
    }
    
    @Test
    @Transactional
    public void getMovimiento() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        // Get the movimiento
        restMovimientoMockMvc.perform(get("/api/movimientos/{id}", movimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(movimiento.getId().intValue()))
            .andExpect(jsonPath("$.whenDate").value(DEFAULT_WHEN_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMovimiento() throws Exception {
        // Get the movimiento
        restMovimientoMockMvc.perform(get("/api/movimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMovimiento() throws Exception {
        // Initialize the database
        movimientoService.save(movimiento);

        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();

        // Update the movimiento
        Movimiento updatedMovimiento = movimientoRepository.findById(movimiento.getId()).get();
        // Disconnect from session so that the updates on updatedMovimiento are not directly saved in db
        em.detach(updatedMovimiento);
        updatedMovimiento
            .whenDate(UPDATED_WHEN_DATE)
            .description(UPDATED_DESCRIPTION)
            .cantidad(UPDATED_CANTIDAD);

        restMovimientoMockMvc.perform(put("/api/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMovimiento)))
            .andExpect(status().isOk());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
        Movimiento testMovimiento = movimientoList.get(movimientoList.size() - 1);
        assertThat(testMovimiento.getWhenDate()).isEqualTo(UPDATED_WHEN_DATE);
        assertThat(testMovimiento.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMovimiento.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoMockMvc.perform(put("/api/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMovimiento() throws Exception {
        // Initialize the database
        movimientoService.save(movimiento);

        int databaseSizeBeforeDelete = movimientoRepository.findAll().size();

        // Delete the movimiento
        restMovimientoMockMvc.perform(delete("/api/movimientos/{id}", movimiento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

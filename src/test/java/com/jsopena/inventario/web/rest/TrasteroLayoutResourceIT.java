package com.jsopena.inventario.web.rest;

import com.jsopena.inventario.InventarioApp;
import com.jsopena.inventario.domain.TrasteroLayout;
import com.jsopena.inventario.repository.TrasteroLayoutRepository;
import com.jsopena.inventario.service.TrasteroLayoutService;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TrasteroLayoutResource} REST controller.
 */
@SpringBootTest(classes = InventarioApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TrasteroLayoutResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TrasteroLayoutRepository trasteroLayoutRepository;

    @Autowired
    private TrasteroLayoutService trasteroLayoutService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTrasteroLayoutMockMvc;

    private TrasteroLayout trasteroLayout;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrasteroLayout createEntity(EntityManager em) {
        TrasteroLayout trasteroLayout = new TrasteroLayout()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return trasteroLayout;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrasteroLayout createUpdatedEntity(EntityManager em) {
        TrasteroLayout trasteroLayout = new TrasteroLayout()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return trasteroLayout;
    }

    @BeforeEach
    public void initTest() {
        trasteroLayout = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrasteroLayout() throws Exception {
        int databaseSizeBeforeCreate = trasteroLayoutRepository.findAll().size();
        // Create the TrasteroLayout
        restTrasteroLayoutMockMvc.perform(post("/api/trastero-layouts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trasteroLayout)))
            .andExpect(status().isCreated());

        // Validate the TrasteroLayout in the database
        List<TrasteroLayout> trasteroLayoutList = trasteroLayoutRepository.findAll();
        assertThat(trasteroLayoutList).hasSize(databaseSizeBeforeCreate + 1);
        TrasteroLayout testTrasteroLayout = trasteroLayoutList.get(trasteroLayoutList.size() - 1);
        assertThat(testTrasteroLayout.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTrasteroLayout.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTrasteroLayoutWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trasteroLayoutRepository.findAll().size();

        // Create the TrasteroLayout with an existing ID
        trasteroLayout.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrasteroLayoutMockMvc.perform(post("/api/trastero-layouts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trasteroLayout)))
            .andExpect(status().isBadRequest());

        // Validate the TrasteroLayout in the database
        List<TrasteroLayout> trasteroLayoutList = trasteroLayoutRepository.findAll();
        assertThat(trasteroLayoutList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = trasteroLayoutRepository.findAll().size();
        // set the field null
        trasteroLayout.setName(null);

        // Create the TrasteroLayout, which fails.


        restTrasteroLayoutMockMvc.perform(post("/api/trastero-layouts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trasteroLayout)))
            .andExpect(status().isBadRequest());

        List<TrasteroLayout> trasteroLayoutList = trasteroLayoutRepository.findAll();
        assertThat(trasteroLayoutList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrasteroLayouts() throws Exception {
        // Initialize the database
        trasteroLayoutRepository.saveAndFlush(trasteroLayout);

        // Get all the trasteroLayoutList
        restTrasteroLayoutMockMvc.perform(get("/api/trastero-layouts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trasteroLayout.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getTrasteroLayout() throws Exception {
        // Initialize the database
        trasteroLayoutRepository.saveAndFlush(trasteroLayout);

        // Get the trasteroLayout
        restTrasteroLayoutMockMvc.perform(get("/api/trastero-layouts/{id}", trasteroLayout.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trasteroLayout.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingTrasteroLayout() throws Exception {
        // Get the trasteroLayout
        restTrasteroLayoutMockMvc.perform(get("/api/trastero-layouts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrasteroLayout() throws Exception {
        // Initialize the database
        trasteroLayoutService.save(trasteroLayout);

        int databaseSizeBeforeUpdate = trasteroLayoutRepository.findAll().size();

        // Update the trasteroLayout
        TrasteroLayout updatedTrasteroLayout = trasteroLayoutRepository.findById(trasteroLayout.getId()).get();
        // Disconnect from session so that the updates on updatedTrasteroLayout are not directly saved in db
        em.detach(updatedTrasteroLayout);
        updatedTrasteroLayout
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restTrasteroLayoutMockMvc.perform(put("/api/trastero-layouts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrasteroLayout)))
            .andExpect(status().isOk());

        // Validate the TrasteroLayout in the database
        List<TrasteroLayout> trasteroLayoutList = trasteroLayoutRepository.findAll();
        assertThat(trasteroLayoutList).hasSize(databaseSizeBeforeUpdate);
        TrasteroLayout testTrasteroLayout = trasteroLayoutList.get(trasteroLayoutList.size() - 1);
        assertThat(testTrasteroLayout.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTrasteroLayout.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTrasteroLayout() throws Exception {
        int databaseSizeBeforeUpdate = trasteroLayoutRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrasteroLayoutMockMvc.perform(put("/api/trastero-layouts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trasteroLayout)))
            .andExpect(status().isBadRequest());

        // Validate the TrasteroLayout in the database
        List<TrasteroLayout> trasteroLayoutList = trasteroLayoutRepository.findAll();
        assertThat(trasteroLayoutList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrasteroLayout() throws Exception {
        // Initialize the database
        trasteroLayoutService.save(trasteroLayout);

        int databaseSizeBeforeDelete = trasteroLayoutRepository.findAll().size();

        // Delete the trasteroLayout
        restTrasteroLayoutMockMvc.perform(delete("/api/trastero-layouts/{id}", trasteroLayout.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TrasteroLayout> trasteroLayoutList = trasteroLayoutRepository.findAll();
        assertThat(trasteroLayoutList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

package com.jsopena.inventario.web.rest;

import com.jsopena.inventario.domain.TrasteroLayout;
import com.jsopena.inventario.service.TrasteroLayoutService;
import com.jsopena.inventario.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jsopena.inventario.domain.TrasteroLayout}.
 */
@RestController
@RequestMapping("/api")
public class TrasteroLayoutResource {

    private final Logger log = LoggerFactory.getLogger(TrasteroLayoutResource.class);

    private static final String ENTITY_NAME = "trasteroLayout";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrasteroLayoutService trasteroLayoutService;

    public TrasteroLayoutResource(TrasteroLayoutService trasteroLayoutService) {
        this.trasteroLayoutService = trasteroLayoutService;
    }

    /**
     * {@code POST  /trastero-layouts} : Create a new trasteroLayout.
     *
     * @param trasteroLayout the trasteroLayout to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trasteroLayout, or with status {@code 400 (Bad Request)} if the trasteroLayout has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/trastero-layouts")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<TrasteroLayout> createTrasteroLayout(@Valid @RequestBody TrasteroLayout trasteroLayout) throws URISyntaxException {
        log.debug("REST request to save TrasteroLayout : {}", trasteroLayout);
        if (trasteroLayout.getId() != null) {
            throw new BadRequestAlertException("A new trasteroLayout cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrasteroLayout result = trasteroLayoutService.save(trasteroLayout);
        return ResponseEntity.created(new URI("/api/trastero-layouts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /trastero-layouts} : Updates an existing trasteroLayout.
     *
     * @param trasteroLayout the trasteroLayout to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trasteroLayout,
     * or with status {@code 400 (Bad Request)} if the trasteroLayout is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trasteroLayout couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/trastero-layouts")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<TrasteroLayout> updateTrasteroLayout(@Valid @RequestBody TrasteroLayout trasteroLayout) throws URISyntaxException {
        log.debug("REST request to update TrasteroLayout : {}", trasteroLayout);
        if (trasteroLayout.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrasteroLayout result = trasteroLayoutService.save(trasteroLayout);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trasteroLayout.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /trastero-layouts} : get all the trasteroLayouts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trasteroLayouts in body.
     */
    @GetMapping("/trastero-layouts")
    public List<TrasteroLayout> getAllTrasteroLayouts() {
        log.debug("REST request to get all TrasteroLayouts");
        return trasteroLayoutService.findAll();
    }

    /**
     * {@code GET  /trastero-layouts/:id} : get the "id" trasteroLayout.
     *
     * @param id the id of the trasteroLayout to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trasteroLayout, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/trastero-layouts/{id}")
    public ResponseEntity<TrasteroLayout> getTrasteroLayout(@PathVariable Long id) {
        log.debug("REST request to get TrasteroLayout : {}", id);
        Optional<TrasteroLayout> trasteroLayout = trasteroLayoutService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trasteroLayout);
    }

    /**
     * {@code DELETE  /trastero-layouts/:id} : delete the "id" trasteroLayout.
     *
     * @param id the id of the trasteroLayout to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/trastero-layouts/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteTrasteroLayout(@PathVariable Long id) {
        log.debug("REST request to delete TrasteroLayout : {}", id);
        trasteroLayoutService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

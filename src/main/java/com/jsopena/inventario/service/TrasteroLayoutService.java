package com.jsopena.inventario.service;

import com.jsopena.inventario.domain.TrasteroLayout;
import com.jsopena.inventario.repository.TrasteroLayoutRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TrasteroLayout}.
 */
@Service
@Transactional
public class TrasteroLayoutService {

    private final Logger log = LoggerFactory.getLogger(TrasteroLayoutService.class);

    private final TrasteroLayoutRepository trasteroLayoutRepository;

    public TrasteroLayoutService(TrasteroLayoutRepository trasteroLayoutRepository) {
        this.trasteroLayoutRepository = trasteroLayoutRepository;
    }

    /**
     * Save a trasteroLayout.
     *
     * @param trasteroLayout the entity to save.
     * @return the persisted entity.
     */
    public TrasteroLayout save(TrasteroLayout trasteroLayout) {
        log.debug("Request to save TrasteroLayout : {}", trasteroLayout);
        return trasteroLayoutRepository.save(trasteroLayout);
    }

    /**
     * Get all the trasteroLayouts.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TrasteroLayout> findAll() {
        log.debug("Request to get all TrasteroLayouts");
        return trasteroLayoutRepository.findAll();
    }


    /**
     * Get one trasteroLayout by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TrasteroLayout> findOne(Long id) {
        log.debug("Request to get TrasteroLayout : {}", id);
        return trasteroLayoutRepository.findById(id);
    }

    /**
     * Delete the trasteroLayout by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TrasteroLayout : {}", id);
        trasteroLayoutRepository.deleteById(id);
    }
}

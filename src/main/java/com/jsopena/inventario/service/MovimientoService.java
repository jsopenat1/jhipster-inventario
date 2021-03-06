package com.jsopena.inventario.service;

import com.jsopena.inventario.domain.Movimiento;
import com.jsopena.inventario.repository.MovimientoRepository;
import com.jsopena.inventario.security.AuthoritiesConstants;
import com.jsopena.inventario.security.SecurityUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Movimiento}.
 */
@Service
@Transactional
public class MovimientoService {

    private final Logger log = LoggerFactory.getLogger(MovimientoService.class);

    private final MovimientoRepository movimientoRepository;

    public MovimientoService(MovimientoRepository movimientoRepository) {
        this.movimientoRepository = movimientoRepository;
    }

    /**
     * Save a movimiento.
     *
     * @param movimiento the entity to save.
     * @return the persisted entity.
     */
    public Movimiento save(Movimiento movimiento) {
        log.debug("Request to save Movimiento : {}", movimiento);
        return movimientoRepository.save(movimiento);
    }

    /**
     * Get all the movimientos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Movimiento> findAll(Pageable pageable) {
        log.debug("Request to get all Movimientos");
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
                  return movimientoRepository.findAll(pageable);
              } else
                  return movimientoRepository.findByUserIsCurrentUser(pageable);
    }


    /**
     * Get one movimiento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Movimiento> findOne(Long id) {
        log.debug("Request to get Movimiento : {}", id);
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
                  return movimientoRepository.findById(id);
              } else
                  return movimientoRepository.findOneByIdAndCustomerUserLogin(id);        
    }

    /**
     * Delete the movimiento by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Movimiento : {}", id);
        movimientoRepository.deleteById(id);
    }
}

package com.jsopena.inventario.repository;

import com.jsopena.inventario.domain.Movimiento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Movimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {

    @Query("select movimiento from Movimiento movimiento where movimiento.user.login = ?#{principal.username}")
    List<Movimiento> findByUserIsCurrentUser();
}

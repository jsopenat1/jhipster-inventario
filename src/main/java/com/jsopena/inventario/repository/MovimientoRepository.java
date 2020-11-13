package com.jsopena.inventario.repository;

import com.jsopena.inventario.domain.Movimiento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Movimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {

    @Query("select movimiento from Movimiento movimiento where movimiento.user.login = ?#{principal.username}")
    Page<Movimiento> findByUserIsCurrentUser(Pageable pageable);
    
    @Query("select movimiento from Movimiento movimiento where movimiento.user.login = ?#{principal.username} and movimiento.id=:id")
	Optional<Movimiento> findOneByIdAndCustomerUserLogin(Long id);
}

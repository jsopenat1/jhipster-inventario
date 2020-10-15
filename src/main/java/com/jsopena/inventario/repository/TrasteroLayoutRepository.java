package com.jsopena.inventario.repository;

import com.jsopena.inventario.domain.TrasteroLayout;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TrasteroLayout entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrasteroLayoutRepository extends JpaRepository<TrasteroLayout, Long> {
}

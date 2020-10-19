package com.jsopena.inventario.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;


/**
 * A Movimiento.
 */
@Entity
@Table(name = "movimiento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Movimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "when_date", nullable = false)
    private Instant whenDate;

    @Column(name = "description")
    private String description;

    @NotNull
    @DecimalMin(value = "1")
    @Column(name = "cantidad", precision = 21, scale = 2, nullable = false)
    private BigDecimal cantidad;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "movimientos", allowSetters = true)
    private User user;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "movimientos", allowSetters = true)
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getWhenDate() {
        return whenDate;
    }

    public Movimiento whenDate(Instant whenDate) {
        this.whenDate = whenDate;
        return this;
    }

    public void setWhenDate(Instant whenDate) {
        this.whenDate = whenDate;
    }

    public String getDescription() {
        return description;
    }

    public Movimiento description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public Movimiento cantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public User getUser() {
        return user;
    }

    public Movimiento user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public Movimiento product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Movimiento)) {
            return false;
        }
        return id != null && id.equals(((Movimiento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Movimiento{" +
            "id=" + getId() +
            ", whenDate='" + getWhenDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", cantidad=" + getCantidad() +
            "}";
    }
}

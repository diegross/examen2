package com.cenfotec.examen2.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Curso.
 */
@Entity
@Table(name = "curso")
public class Curso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "estado")
    private String estado;

    @OneToOne
    @JoinColumn(unique = true)
    private Profesor profesor;

    @OneToOne
    @JoinColumn(unique = true)
    private Periodo periodo;

    @ManyToOne
    @JsonIgnoreProperties("cursos")
    private Estudiante estudiante;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Curso nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEstado() {
        return estado;
    }

    public Curso estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public Curso profesor(Profesor profesor) {
        this.profesor = profesor;
        return this;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }

    public Periodo getPeriodo() {
        return periodo;
    }

    public Curso periodo(Periodo periodo) {
        this.periodo = periodo;
        return this;
    }

    public void setPeriodo(Periodo periodo) {
        this.periodo = periodo;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public Curso estudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
        return this;
    }

    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Curso)) {
            return false;
        }
        return id != null && id.equals(((Curso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Curso{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}

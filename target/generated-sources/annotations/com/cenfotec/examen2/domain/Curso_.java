package com.cenfotec.examen2.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Curso.class)
public abstract class Curso_ {

	public static volatile SingularAttribute<Curso, Estudiante> estudiante;
	public static volatile SingularAttribute<Curso, String> estado;
	public static volatile SingularAttribute<Curso, Periodo> periodo;
	public static volatile SingularAttribute<Curso, Profesor> profesor;
	public static volatile SingularAttribute<Curso, Long> id;
	public static volatile SingularAttribute<Curso, String> nombre;

	public static final String ESTUDIANTE = "estudiante";
	public static final String ESTADO = "estado";
	public static final String PERIODO = "periodo";
	public static final String PROFESOR = "profesor";
	public static final String ID = "id";
	public static final String NOMBRE = "nombre";

}


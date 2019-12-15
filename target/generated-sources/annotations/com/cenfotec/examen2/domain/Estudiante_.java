package com.cenfotec.examen2.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Estudiante.class)
public abstract class Estudiante_ {

	public static volatile SingularAttribute<Estudiante, String> primerApellido;
	public static volatile SingularAttribute<Estudiante, LocalDate> fechaNacimiento;
	public static volatile SingularAttribute<Estudiante, String> genero;
	public static volatile SingularAttribute<Estudiante, String> segundoApellido;
	public static volatile SingularAttribute<Estudiante, Long> id;
	public static volatile SingularAttribute<Estudiante, String> nombre;

	public static final String PRIMER_APELLIDO = "primerApellido";
	public static final String FECHA_NACIMIENTO = "fechaNacimiento";
	public static final String GENERO = "genero";
	public static final String SEGUNDO_APELLIDO = "segundoApellido";
	public static final String ID = "id";
	public static final String NOMBRE = "nombre";

}


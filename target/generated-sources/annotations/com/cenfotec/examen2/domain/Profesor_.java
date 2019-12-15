package com.cenfotec.examen2.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Profesor.class)
public abstract class Profesor_ {

	public static volatile SingularAttribute<Profesor, String> primerApellido;
	public static volatile SingularAttribute<Profesor, LocalDate> fechaNacimiento;
	public static volatile SingularAttribute<Profesor, String> genero;
	public static volatile SingularAttribute<Profesor, LocalDate> fechaContratacion;
	public static volatile SingularAttribute<Profesor, String> segundoApellido;
	public static volatile SingularAttribute<Profesor, Long> id;
	public static volatile SingularAttribute<Profesor, String> nombre;

	public static final String PRIMER_APELLIDO = "primerApellido";
	public static final String FECHA_NACIMIENTO = "fechaNacimiento";
	public static final String GENERO = "genero";
	public static final String FECHA_CONTRATACION = "fechaContratacion";
	public static final String SEGUNDO_APELLIDO = "segundoApellido";
	public static final String ID = "id";
	public static final String NOMBRE = "nombre";

}


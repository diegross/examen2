package com.cenfotec.examen2.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Periodo.class)
public abstract class Periodo_ {

	public static volatile SingularAttribute<Periodo, String> estado;
	public static volatile SingularAttribute<Periodo, LocalDate> fechaInicio;
	public static volatile SingularAttribute<Periodo, Long> id;
	public static volatile SingularAttribute<Periodo, String> nombre;
	public static volatile SingularAttribute<Periodo, LocalDate> fechaFin;

	public static final String ESTADO = "estado";
	public static final String FECHA_INICIO = "fechaInicio";
	public static final String ID = "id";
	public static final String NOMBRE = "nombre";
	public static final String FECHA_FIN = "fechaFin";

}


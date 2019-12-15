import { Moment } from 'moment';

export interface IProfesor {
  id?: number;
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  genero?: string;
  fechaNacimiento?: Moment;
  fechaContratacion?: Moment;
}

export class Profesor implements IProfesor {
  constructor(
    public id?: number,
    public nombre?: string,
    public primerApellido?: string,
    public segundoApellido?: string,
    public genero?: string,
    public fechaNacimiento?: Moment,
    public fechaContratacion?: Moment
  ) {}
}

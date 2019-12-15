import { Moment } from 'moment';

export interface IEstudiante {
  id?: number;
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  genero?: string;
  fechaNacimiento?: Moment;
}

export class Estudiante implements IEstudiante {
  constructor(
    public id?: number,
    public nombre?: string,
    public primerApellido?: string,
    public segundoApellido?: string,
    public genero?: string,
    public fechaNacimiento?: Moment
  ) {}
}

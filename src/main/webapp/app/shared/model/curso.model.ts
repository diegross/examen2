import { IProfesor } from 'app/shared/model/profesor.model';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { IEstudiante } from 'app/shared/model/estudiante.model';

export interface ICurso {
  id?: number;
  nombre?: string;
  estado?: string;
  profesor?: IProfesor;
  periodo?: IPeriodo;
  estudiante?: IEstudiante;
}

export class Curso implements ICurso {
  constructor(
    public id?: number,
    public nombre?: string,
    public estado?: string,
    public profesor?: IProfesor,
    public periodo?: IPeriodo,
    public estudiante?: IEstudiante
  ) {}
}

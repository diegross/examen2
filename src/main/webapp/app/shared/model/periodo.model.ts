import { Moment } from 'moment';

export interface IPeriodo {
  id?: number;
  nombre?: string;
  fechaInicio?: Moment;
  fechaFin?: Moment;
  estado?: string;
}

export class Periodo implements IPeriodo {
  constructor(public id?: number, public nombre?: string, public fechaInicio?: Moment, public fechaFin?: Moment, public estado?: string) {}
}

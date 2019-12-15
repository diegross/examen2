import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstudiante } from 'app/shared/model/estudiante.model';

type EntityResponseType = HttpResponse<IEstudiante>;
type EntityArrayResponseType = HttpResponse<IEstudiante[]>;

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  public resourceUrl = SERVER_API_URL + 'api/estudiantes';

  constructor(protected http: HttpClient) {}

  create(estudiante: IEstudiante): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(estudiante);
    return this.http
      .post<IEstudiante>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(estudiante: IEstudiante): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(estudiante);
    return this.http
      .put<IEstudiante>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEstudiante>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEstudiante[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(estudiante: IEstudiante): IEstudiante {
    const copy: IEstudiante = Object.assign({}, estudiante, {
      fechaNacimiento:
        estudiante.fechaNacimiento != null && estudiante.fechaNacimiento.isValid() ? estudiante.fechaNacimiento.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaNacimiento = res.body.fechaNacimiento != null ? moment(res.body.fechaNacimiento) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((estudiante: IEstudiante) => {
        estudiante.fechaNacimiento = estudiante.fechaNacimiento != null ? moment(estudiante.fechaNacimiento) : null;
      });
    }
    return res;
  }
}

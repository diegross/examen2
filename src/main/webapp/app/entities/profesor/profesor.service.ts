import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfesor } from 'app/shared/model/profesor.model';

type EntityResponseType = HttpResponse<IProfesor>;
type EntityArrayResponseType = HttpResponse<IProfesor[]>;

@Injectable({ providedIn: 'root' })
export class ProfesorService {
  public resourceUrl = SERVER_API_URL + 'api/profesors';

  constructor(protected http: HttpClient) {}

  create(profesor: IProfesor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profesor);
    return this.http
      .post<IProfesor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(profesor: IProfesor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profesor);
    return this.http
      .put<IProfesor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfesor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfesor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(profesor: IProfesor): IProfesor {
    const copy: IProfesor = Object.assign({}, profesor, {
      fechaNacimiento:
        profesor.fechaNacimiento != null && profesor.fechaNacimiento.isValid() ? profesor.fechaNacimiento.format(DATE_FORMAT) : null,
      fechaContratacion:
        profesor.fechaContratacion != null && profesor.fechaContratacion.isValid() ? profesor.fechaContratacion.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaNacimiento = res.body.fechaNacimiento != null ? moment(res.body.fechaNacimiento) : null;
      res.body.fechaContratacion = res.body.fechaContratacion != null ? moment(res.body.fechaContratacion) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((profesor: IProfesor) => {
        profesor.fechaNacimiento = profesor.fechaNacimiento != null ? moment(profesor.fechaNacimiento) : null;
        profesor.fechaContratacion = profesor.fechaContratacion != null ? moment(profesor.fechaContratacion) : null;
      });
    }
    return res;
  }
}

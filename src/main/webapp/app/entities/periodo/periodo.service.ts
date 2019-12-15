import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPeriodo } from 'app/shared/model/periodo.model';

type EntityResponseType = HttpResponse<IPeriodo>;
type EntityArrayResponseType = HttpResponse<IPeriodo[]>;

@Injectable({ providedIn: 'root' })
export class PeriodoService {
  public resourceUrl = SERVER_API_URL + 'api/periodos';

  constructor(protected http: HttpClient) {}

  create(periodo: IPeriodo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(periodo);
    return this.http
      .post<IPeriodo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(periodo: IPeriodo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(periodo);
    return this.http
      .put<IPeriodo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPeriodo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPeriodo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(periodo: IPeriodo): IPeriodo {
    const copy: IPeriodo = Object.assign({}, periodo, {
      fechaInicio: periodo.fechaInicio != null && periodo.fechaInicio.isValid() ? periodo.fechaInicio.format(DATE_FORMAT) : null,
      fechaFin: periodo.fechaFin != null && periodo.fechaFin.isValid() ? periodo.fechaFin.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicio = res.body.fechaInicio != null ? moment(res.body.fechaInicio) : null;
      res.body.fechaFin = res.body.fechaFin != null ? moment(res.body.fechaFin) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((periodo: IPeriodo) => {
        periodo.fechaInicio = periodo.fechaInicio != null ? moment(periodo.fechaInicio) : null;
        periodo.fechaFin = periodo.fechaFin != null ? moment(periodo.fechaFin) : null;
      });
    }
    return res;
  }
}

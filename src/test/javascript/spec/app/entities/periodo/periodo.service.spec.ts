import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PeriodoService } from 'app/entities/periodo/periodo.service';
import { IPeriodo, Periodo } from 'app/shared/model/periodo.model';

describe('Service Tests', () => {
  describe('Periodo Service', () => {
    let injector: TestBed;
    let service: PeriodoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPeriodo;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PeriodoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Periodo(0, 'AAAAAAA', currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Periodo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );
        service
          .create(new Periodo(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Periodo', () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT),
            estado: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Periodo', () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            fechaInicio: currentDate.format(DATE_FORMAT),
            fechaFin: currentDate.format(DATE_FORMAT),
            estado: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaInicio: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Periodo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

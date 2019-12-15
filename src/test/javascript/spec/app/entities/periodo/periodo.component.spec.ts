import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Examen2Proyecto3TestModule } from '../../../test.module';
import { PeriodoComponent } from 'app/entities/periodo/periodo.component';
import { PeriodoService } from 'app/entities/periodo/periodo.service';
import { Periodo } from 'app/shared/model/periodo.model';

describe('Component Tests', () => {
  describe('Periodo Management Component', () => {
    let comp: PeriodoComponent;
    let fixture: ComponentFixture<PeriodoComponent>;
    let service: PeriodoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Examen2Proyecto3TestModule],
        declarations: [PeriodoComponent],
        providers: []
      })
        .overrideTemplate(PeriodoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PeriodoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PeriodoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Periodo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.periodos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

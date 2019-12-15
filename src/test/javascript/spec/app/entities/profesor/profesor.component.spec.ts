import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Examen2Proyecto3TestModule } from '../../../test.module';
import { ProfesorComponent } from 'app/entities/profesor/profesor.component';
import { ProfesorService } from 'app/entities/profesor/profesor.service';
import { Profesor } from 'app/shared/model/profesor.model';

describe('Component Tests', () => {
  describe('Profesor Management Component', () => {
    let comp: ProfesorComponent;
    let fixture: ComponentFixture<ProfesorComponent>;
    let service: ProfesorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Examen2Proyecto3TestModule],
        declarations: [ProfesorComponent],
        providers: []
      })
        .overrideTemplate(ProfesorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfesorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfesorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Profesor(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profesors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

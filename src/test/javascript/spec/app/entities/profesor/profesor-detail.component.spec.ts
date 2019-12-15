import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Examen2Proyecto3TestModule } from '../../../test.module';
import { ProfesorDetailComponent } from 'app/entities/profesor/profesor-detail.component';
import { Profesor } from 'app/shared/model/profesor.model';

describe('Component Tests', () => {
  describe('Profesor Management Detail Component', () => {
    let comp: ProfesorDetailComponent;
    let fixture: ComponentFixture<ProfesorDetailComponent>;
    const route = ({ data: of({ profesor: new Profesor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Examen2Proyecto3TestModule],
        declarations: [ProfesorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProfesorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfesorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profesor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

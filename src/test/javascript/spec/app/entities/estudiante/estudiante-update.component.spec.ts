import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Examen2Proyecto3TestModule } from '../../../test.module';
import { EstudianteUpdateComponent } from 'app/entities/estudiante/estudiante-update.component';
import { EstudianteService } from 'app/entities/estudiante/estudiante.service';
import { Estudiante } from 'app/shared/model/estudiante.model';

describe('Component Tests', () => {
  describe('Estudiante Management Update Component', () => {
    let comp: EstudianteUpdateComponent;
    let fixture: ComponentFixture<EstudianteUpdateComponent>;
    let service: EstudianteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Examen2Proyecto3TestModule],
        declarations: [EstudianteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstudianteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstudianteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstudianteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Estudiante(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Estudiante();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
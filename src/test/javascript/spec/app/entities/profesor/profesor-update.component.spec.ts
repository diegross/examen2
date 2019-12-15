import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Examen2Proyecto3TestModule } from '../../../test.module';
import { ProfesorUpdateComponent } from 'app/entities/profesor/profesor-update.component';
import { ProfesorService } from 'app/entities/profesor/profesor.service';
import { Profesor } from 'app/shared/model/profesor.model';

describe('Component Tests', () => {
  describe('Profesor Management Update Component', () => {
    let comp: ProfesorUpdateComponent;
    let fixture: ComponentFixture<ProfesorUpdateComponent>;
    let service: ProfesorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Examen2Proyecto3TestModule],
        declarations: [ProfesorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProfesorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfesorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfesorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Profesor(123);
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
        const entity = new Profesor();
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

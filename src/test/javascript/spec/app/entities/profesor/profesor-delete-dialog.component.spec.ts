import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Examen2Proyecto3TestModule } from '../../../test.module';
import { ProfesorDeleteDialogComponent } from 'app/entities/profesor/profesor-delete-dialog.component';
import { ProfesorService } from 'app/entities/profesor/profesor.service';

describe('Component Tests', () => {
  describe('Profesor Management Delete Component', () => {
    let comp: ProfesorDeleteDialogComponent;
    let fixture: ComponentFixture<ProfesorDeleteDialogComponent>;
    let service: ProfesorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Examen2Proyecto3TestModule],
        declarations: [ProfesorDeleteDialogComponent]
      })
        .overrideTemplate(ProfesorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfesorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfesorService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfesor } from 'app/shared/model/profesor.model';
import { ProfesorService } from './profesor.service';

@Component({
  selector: 'jhi-profesor-delete-dialog',
  templateUrl: './profesor-delete-dialog.component.html'
})
export class ProfesorDeleteDialogComponent {
  profesor: IProfesor;

  constructor(protected profesorService: ProfesorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.profesorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'profesorListModification',
        content: 'Deleted an profesor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-profesor-delete-popup',
  template: ''
})
export class ProfesorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ profesor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProfesorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.profesor = profesor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/profesor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/profesor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

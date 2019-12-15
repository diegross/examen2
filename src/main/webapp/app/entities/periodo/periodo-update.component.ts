import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IPeriodo, Periodo } from 'app/shared/model/periodo.model';
import { PeriodoService } from './periodo.service';

@Component({
  selector: 'jhi-periodo-update',
  templateUrl: './periodo-update.component.html'
})
export class PeriodoUpdateComponent implements OnInit {
  isSaving: boolean;
  fechaInicioDp: any;
  fechaFinDp: any;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    fechaInicio: [],
    fechaFin: [],
    estado: []
  });

  constructor(protected periodoService: PeriodoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ periodo }) => {
      this.updateForm(periodo);
    });
  }

  updateForm(periodo: IPeriodo) {
    this.editForm.patchValue({
      id: periodo.id,
      nombre: periodo.nombre,
      fechaInicio: periodo.fechaInicio,
      fechaFin: periodo.fechaFin,
      estado: periodo.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const periodo = this.createFromForm();
    if (periodo.id !== undefined) {
      this.subscribeToSaveResponse(this.periodoService.update(periodo));
    } else {
      this.subscribeToSaveResponse(this.periodoService.create(periodo));
    }
  }

  private createFromForm(): IPeriodo {
    return {
      ...new Periodo(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      fechaInicio: this.editForm.get(['fechaInicio']).value,
      fechaFin: this.editForm.get(['fechaFin']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriodo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

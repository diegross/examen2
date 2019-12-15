import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IProfesor, Profesor } from 'app/shared/model/profesor.model';
import { ProfesorService } from './profesor.service';

@Component({
  selector: 'jhi-profesor-update',
  templateUrl: './profesor-update.component.html'
})
export class ProfesorUpdateComponent implements OnInit {
  isSaving: boolean;
  fechaNacimientoDp: any;
  fechaContratacionDp: any;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    primerApellido: [],
    segundoApellido: [],
    genero: [],
    fechaNacimiento: [],
    fechaContratacion: []
  });

  constructor(protected profesorService: ProfesorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ profesor }) => {
      this.updateForm(profesor);
    });
  }

  updateForm(profesor: IProfesor) {
    this.editForm.patchValue({
      id: profesor.id,
      nombre: profesor.nombre,
      primerApellido: profesor.primerApellido,
      segundoApellido: profesor.segundoApellido,
      genero: profesor.genero,
      fechaNacimiento: profesor.fechaNacimiento,
      fechaContratacion: profesor.fechaContratacion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const profesor = this.createFromForm();
    if (profesor.id !== undefined) {
      this.subscribeToSaveResponse(this.profesorService.update(profesor));
    } else {
      this.subscribeToSaveResponse(this.profesorService.create(profesor));
    }
  }

  private createFromForm(): IProfesor {
    return {
      ...new Profesor(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      primerApellido: this.editForm.get(['primerApellido']).value,
      segundoApellido: this.editForm.get(['segundoApellido']).value,
      genero: this.editForm.get(['genero']).value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento']).value,
      fechaContratacion: this.editForm.get(['fechaContratacion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfesor>>) {
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

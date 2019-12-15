import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IEstudiante, Estudiante } from 'app/shared/model/estudiante.model';
import { EstudianteService } from './estudiante.service';

@Component({
  selector: 'jhi-estudiante-update',
  templateUrl: './estudiante-update.component.html'
})
export class EstudianteUpdateComponent implements OnInit {
  isSaving: boolean;
  fechaNacimientoDp: any;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    primerApellido: [],
    segundoApellido: [],
    genero: [],
    fechaNacimiento: []
  });

  constructor(protected estudianteService: EstudianteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estudiante }) => {
      this.updateForm(estudiante);
    });
  }

  updateForm(estudiante: IEstudiante) {
    this.editForm.patchValue({
      id: estudiante.id,
      nombre: estudiante.nombre,
      primerApellido: estudiante.primerApellido,
      segundoApellido: estudiante.segundoApellido,
      genero: estudiante.genero,
      fechaNacimiento: estudiante.fechaNacimiento
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estudiante = this.createFromForm();
    if (estudiante.id !== undefined) {
      this.subscribeToSaveResponse(this.estudianteService.update(estudiante));
    } else {
      this.subscribeToSaveResponse(this.estudianteService.create(estudiante));
    }
  }

  private createFromForm(): IEstudiante {
    return {
      ...new Estudiante(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      primerApellido: this.editForm.get(['primerApellido']).value,
      segundoApellido: this.editForm.get(['segundoApellido']).value,
      genero: this.editForm.get(['genero']).value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstudiante>>) {
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

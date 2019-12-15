import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICurso, Curso } from 'app/shared/model/curso.model';
import { CursoService } from './curso.service';
import { IProfesor } from 'app/shared/model/profesor.model';
import { ProfesorService } from 'app/entities/profesor/profesor.service';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { PeriodoService } from 'app/entities/periodo/periodo.service';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { EstudianteService } from 'app/entities/estudiante/estudiante.service';

@Component({
  selector: 'jhi-curso-update',
  templateUrl: './curso-update.component.html'
})
export class CursoUpdateComponent implements OnInit {
  isSaving: boolean;

  profesors: IProfesor[];

  periodos: IPeriodo[];

  estudiantes: IEstudiante[];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    estado: [],
    profesor: [],
    periodo: [],
    estudiante: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cursoService: CursoService,
    protected profesorService: ProfesorService,
    protected periodoService: PeriodoService,
    protected estudianteService: EstudianteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ curso }) => {
      this.updateForm(curso);
    });
    this.profesorService
      .query({ filter: 'curso-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IProfesor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProfesor[]>) => response.body)
      )
      .subscribe(
        (res: IProfesor[]) => {
          if (!this.editForm.get('profesor').value || !this.editForm.get('profesor').value.id) {
            this.profesors = res;
          } else {
            this.profesorService
              .find(this.editForm.get('profesor').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IProfesor>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IProfesor>) => subResponse.body)
              )
              .subscribe(
                (subRes: IProfesor) => (this.profesors = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.periodoService
      .query({ filter: 'curso-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPeriodo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPeriodo[]>) => response.body)
      )
      .subscribe(
        (res: IPeriodo[]) => {
          if (!this.editForm.get('periodo').value || !this.editForm.get('periodo').value.id) {
            this.periodos = res;
          } else {
            this.periodoService
              .find(this.editForm.get('periodo').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPeriodo>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPeriodo>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPeriodo) => (this.periodos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.estudianteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstudiante[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstudiante[]>) => response.body)
      )
      .subscribe((res: IEstudiante[]) => (this.estudiantes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(curso: ICurso) {
    this.editForm.patchValue({
      id: curso.id,
      nombre: curso.nombre,
      estado: curso.estado,
      profesor: curso.profesor,
      periodo: curso.periodo,
      estudiante: curso.estudiante
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const curso = this.createFromForm();
    if (curso.id !== undefined) {
      this.subscribeToSaveResponse(this.cursoService.update(curso));
    } else {
      this.subscribeToSaveResponse(this.cursoService.create(curso));
    }
  }

  private createFromForm(): ICurso {
    return {
      ...new Curso(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      estado: this.editForm.get(['estado']).value,
      profesor: this.editForm.get(['profesor']).value,
      periodo: this.editForm.get(['periodo']).value,
      estudiante: this.editForm.get(['estudiante']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICurso>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProfesorById(index: number, item: IProfesor) {
    return item.id;
  }

  trackPeriodoById(index: number, item: IPeriodo) {
    return item.id;
  }

  trackEstudianteById(index: number, item: IEstudiante) {
    return item.id;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IEstudiante } from 'app/shared/model/estudiante.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstudianteService } from './estudiante.service';

@Component({
  selector: 'jhi-estudiante',
  templateUrl: './estudiante.component.html'
})
export class EstudianteComponent implements OnInit, OnDestroy {
  estudiantes: IEstudiante[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estudianteService: EstudianteService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estudianteService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstudiante[]>) => res.ok),
        map((res: HttpResponse<IEstudiante[]>) => res.body)
      )
      .subscribe((res: IEstudiante[]) => {
        this.estudiantes = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstudiantes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstudiante) {
    return item.id;
  }

  registerChangeInEstudiantes() {
    this.eventSubscriber = this.eventManager.subscribe('estudianteListModification', response => this.loadAll());
  }
}

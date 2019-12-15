import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IProfesor } from 'app/shared/model/profesor.model';
import { AccountService } from 'app/core/auth/account.service';
import { ProfesorService } from './profesor.service';

@Component({
  selector: 'jhi-profesor',
  templateUrl: './profesor.component.html'
})
export class ProfesorComponent implements OnInit, OnDestroy {
  profesors: IProfesor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected profesorService: ProfesorService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.profesorService
      .query()
      .pipe(
        filter((res: HttpResponse<IProfesor[]>) => res.ok),
        map((res: HttpResponse<IProfesor[]>) => res.body)
      )
      .subscribe((res: IProfesor[]) => {
        this.profesors = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProfesors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProfesor) {
    return item.id;
  }

  registerChangeInProfesors() {
    this.eventSubscriber = this.eventManager.subscribe('profesorListModification', response => this.loadAll());
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPeriodo } from 'app/shared/model/periodo.model';
import { AccountService } from 'app/core/auth/account.service';
import { PeriodoService } from './periodo.service';

@Component({
  selector: 'jhi-periodo',
  templateUrl: './periodo.component.html'
})
export class PeriodoComponent implements OnInit, OnDestroy {
  periodos: IPeriodo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected periodoService: PeriodoService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.periodoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPeriodo[]>) => res.ok),
        map((res: HttpResponse<IPeriodo[]>) => res.body)
      )
      .subscribe((res: IPeriodo[]) => {
        this.periodos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPeriodos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPeriodo) {
    return item.id;
  }

  registerChangeInPeriodos() {
    this.eventSubscriber = this.eventManager.subscribe('periodoListModification', response => this.loadAll());
  }
}

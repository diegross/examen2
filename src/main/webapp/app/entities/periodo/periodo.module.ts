import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Examen2Proyecto3SharedModule } from 'app/shared/shared.module';
import { PeriodoComponent } from './periodo.component';
import { PeriodoDetailComponent } from './periodo-detail.component';
import { PeriodoUpdateComponent } from './periodo-update.component';
import { PeriodoDeletePopupComponent, PeriodoDeleteDialogComponent } from './periodo-delete-dialog.component';
import { periodoRoute, periodoPopupRoute } from './periodo.route';

const ENTITY_STATES = [...periodoRoute, ...periodoPopupRoute];

@NgModule({
  imports: [Examen2Proyecto3SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PeriodoComponent,
    PeriodoDetailComponent,
    PeriodoUpdateComponent,
    PeriodoDeleteDialogComponent,
    PeriodoDeletePopupComponent
  ],
  entryComponents: [PeriodoDeleteDialogComponent]
})
export class Examen2Proyecto3PeriodoModule {}

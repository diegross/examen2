import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Examen2Proyecto3SharedModule } from 'app/shared/shared.module';
import { ProfesorComponent } from './profesor.component';
import { ProfesorDetailComponent } from './profesor-detail.component';
import { ProfesorUpdateComponent } from './profesor-update.component';
import { ProfesorDeletePopupComponent, ProfesorDeleteDialogComponent } from './profesor-delete-dialog.component';
import { profesorRoute, profesorPopupRoute } from './profesor.route';

const ENTITY_STATES = [...profesorRoute, ...profesorPopupRoute];

@NgModule({
  imports: [Examen2Proyecto3SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProfesorComponent,
    ProfesorDetailComponent,
    ProfesorUpdateComponent,
    ProfesorDeleteDialogComponent,
    ProfesorDeletePopupComponent
  ],
  entryComponents: [ProfesorDeleteDialogComponent]
})
export class Examen2Proyecto3ProfesorModule {}

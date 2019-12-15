import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Examen2Proyecto3SharedModule } from 'app/shared/shared.module';
import { EstudianteComponent } from './estudiante.component';
import { EstudianteDetailComponent } from './estudiante-detail.component';
import { EstudianteUpdateComponent } from './estudiante-update.component';
import { EstudianteDeletePopupComponent, EstudianteDeleteDialogComponent } from './estudiante-delete-dialog.component';
import { estudianteRoute, estudiantePopupRoute } from './estudiante.route';

const ENTITY_STATES = [...estudianteRoute, ...estudiantePopupRoute];

@NgModule({
  imports: [Examen2Proyecto3SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstudianteComponent,
    EstudianteDetailComponent,
    EstudianteUpdateComponent,
    EstudianteDeleteDialogComponent,
    EstudianteDeletePopupComponent
  ],
  entryComponents: [EstudianteDeleteDialogComponent]
})
export class Examen2Proyecto3EstudianteModule {}

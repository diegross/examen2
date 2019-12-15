import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Examen2Proyecto3SharedModule } from 'app/shared/shared.module';
import { CursoComponent } from './curso.component';
import { CursoDetailComponent } from './curso-detail.component';
import { CursoUpdateComponent } from './curso-update.component';
import { CursoDeletePopupComponent, CursoDeleteDialogComponent } from './curso-delete-dialog.component';
import { cursoRoute, cursoPopupRoute } from './curso.route';

const ENTITY_STATES = [...cursoRoute, ...cursoPopupRoute];

@NgModule({
  imports: [Examen2Proyecto3SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CursoComponent, CursoDetailComponent, CursoUpdateComponent, CursoDeleteDialogComponent, CursoDeletePopupComponent],
  entryComponents: [CursoDeleteDialogComponent]
})
export class Examen2Proyecto3CursoModule {}

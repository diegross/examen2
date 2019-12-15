import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Examen2Proyecto3SharedModule } from 'app/shared/shared.module';

import { AuditsComponent } from './audits.component';

import { auditsRoute } from './audits.route';

@NgModule({
  imports: [Examen2Proyecto3SharedModule, RouterModule.forChild([auditsRoute])],
  declarations: [AuditsComponent]
})
export class AuditsModule {}

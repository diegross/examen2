import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Examen2Proyecto3SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [Examen2Proyecto3SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class Examen2Proyecto3HomeModule {}

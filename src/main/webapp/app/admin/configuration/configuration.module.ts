import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Examen2Proyecto3SharedModule } from 'app/shared/shared.module';

import { JhiConfigurationComponent } from './configuration.component';

import { configurationRoute } from './configuration.route';

@NgModule({
  imports: [Examen2Proyecto3SharedModule, RouterModule.forChild([configurationRoute])],
  declarations: [JhiConfigurationComponent]
})
export class ConfigurationModule {}

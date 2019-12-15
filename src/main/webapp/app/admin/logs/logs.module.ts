import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Examen2Proyecto3SharedModule } from 'app/shared/shared.module';

import { LogsComponent } from './logs.component';

import { logsRoute } from './logs.route';

@NgModule({
  imports: [Examen2Proyecto3SharedModule, RouterModule.forChild([logsRoute])],
  declarations: [LogsComponent]
})
export class LogsModule {}

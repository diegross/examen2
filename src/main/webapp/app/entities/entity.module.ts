import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'estudiante',
        loadChildren: () => import('./estudiante/estudiante.module').then(m => m.Examen2Proyecto3EstudianteModule)
      },
      {
        path: 'curso',
        loadChildren: () => import('./curso/curso.module').then(m => m.Examen2Proyecto3CursoModule)
      },
      {
        path: 'profesor',
        loadChildren: () => import('./profesor/profesor.module').then(m => m.Examen2Proyecto3ProfesorModule)
      },
      {
        path: 'periodo',
        loadChildren: () => import('./periodo/periodo.module').then(m => m.Examen2Proyecto3PeriodoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class Examen2Proyecto3EntityModule {}

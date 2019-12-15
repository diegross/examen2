import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Profesor } from 'app/shared/model/profesor.model';
import { ProfesorService } from './profesor.service';
import { ProfesorComponent } from './profesor.component';
import { ProfesorDetailComponent } from './profesor-detail.component';
import { ProfesorUpdateComponent } from './profesor-update.component';
import { ProfesorDeletePopupComponent } from './profesor-delete-dialog.component';
import { IProfesor } from 'app/shared/model/profesor.model';

@Injectable({ providedIn: 'root' })
export class ProfesorResolve implements Resolve<IProfesor> {
  constructor(private service: ProfesorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProfesor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Profesor>) => response.ok),
        map((profesor: HttpResponse<Profesor>) => profesor.body)
      );
    }
    return of(new Profesor());
  }
}

export const profesorRoute: Routes = [
  {
    path: '',
    component: ProfesorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Profesors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProfesorDetailComponent,
    resolve: {
      profesor: ProfesorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Profesors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProfesorUpdateComponent,
    resolve: {
      profesor: ProfesorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Profesors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProfesorUpdateComponent,
    resolve: {
      profesor: ProfesorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Profesors'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const profesorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProfesorDeletePopupComponent,
    resolve: {
      profesor: ProfesorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Profesors'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

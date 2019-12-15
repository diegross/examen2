import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfesor } from 'app/shared/model/profesor.model';

@Component({
  selector: 'jhi-profesor-detail',
  templateUrl: './profesor-detail.component.html'
})
export class ProfesorDetailComponent implements OnInit {
  profesor: IProfesor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ profesor }) => {
      this.profesor = profesor;
    });
  }

  previousState() {
    window.history.back();
  }
}

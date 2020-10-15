import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrasteroLayout } from 'app/shared/model/trastero-layout.model';

@Component({
  selector: 'jhi-trastero-layout-detail',
  templateUrl: './trastero-layout-detail.component.html',
})
export class TrasteroLayoutDetailComponent implements OnInit {
  trasteroLayout: ITrasteroLayout | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trasteroLayout }) => (this.trasteroLayout = trasteroLayout));
  }

  previousState(): void {
    window.history.back();
  }
}

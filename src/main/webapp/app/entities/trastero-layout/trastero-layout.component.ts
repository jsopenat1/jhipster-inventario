import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrasteroLayout } from 'app/shared/model/trastero-layout.model';
import { TrasteroLayoutService } from './trastero-layout.service';
import { TrasteroLayoutDeleteDialogComponent } from './trastero-layout-delete-dialog.component';

@Component({
  selector: 'jhi-trastero-layout',
  templateUrl: './trastero-layout.component.html',
})
export class TrasteroLayoutComponent implements OnInit, OnDestroy {
  trasteroLayouts?: ITrasteroLayout[];
  eventSubscriber?: Subscription;

  constructor(
    protected trasteroLayoutService: TrasteroLayoutService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.trasteroLayoutService.query().subscribe((res: HttpResponse<ITrasteroLayout[]>) => (this.trasteroLayouts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTrasteroLayouts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITrasteroLayout): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTrasteroLayouts(): void {
    this.eventSubscriber = this.eventManager.subscribe('trasteroLayoutListModification', () => this.loadAll());
  }

  delete(trasteroLayout: ITrasteroLayout): void {
    const modalRef = this.modalService.open(TrasteroLayoutDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.trasteroLayout = trasteroLayout;
  }
}

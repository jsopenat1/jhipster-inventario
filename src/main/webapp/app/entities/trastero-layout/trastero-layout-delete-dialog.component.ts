import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrasteroLayout } from 'app/shared/model/trastero-layout.model';
import { TrasteroLayoutService } from './trastero-layout.service';

@Component({
  templateUrl: './trastero-layout-delete-dialog.component.html',
})
export class TrasteroLayoutDeleteDialogComponent {
  trasteroLayout?: ITrasteroLayout;

  constructor(
    protected trasteroLayoutService: TrasteroLayoutService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trasteroLayoutService.delete(id).subscribe(() => {
      this.eventManager.broadcast('trasteroLayoutListModification');
      this.activeModal.close();
    });
  }
}

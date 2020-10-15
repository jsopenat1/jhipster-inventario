import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InventarioTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { TrasteroLayoutDeleteDialogComponent } from 'app/entities/trastero-layout/trastero-layout-delete-dialog.component';
import { TrasteroLayoutService } from 'app/entities/trastero-layout/trastero-layout.service';

describe('Component Tests', () => {
  describe('TrasteroLayout Management Delete Component', () => {
    let comp: TrasteroLayoutDeleteDialogComponent;
    let fixture: ComponentFixture<TrasteroLayoutDeleteDialogComponent>;
    let service: TrasteroLayoutService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InventarioTestModule],
        declarations: [TrasteroLayoutDeleteDialogComponent],
      })
        .overrideTemplate(TrasteroLayoutDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrasteroLayoutDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrasteroLayoutService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { InventarioTestModule } from '../../../test.module';
import { TrasteroLayoutUpdateComponent } from 'app/entities/trastero-layout/trastero-layout-update.component';
import { TrasteroLayoutService } from 'app/entities/trastero-layout/trastero-layout.service';
import { TrasteroLayout } from 'app/shared/model/trastero-layout.model';

describe('Component Tests', () => {
  describe('TrasteroLayout Management Update Component', () => {
    let comp: TrasteroLayoutUpdateComponent;
    let fixture: ComponentFixture<TrasteroLayoutUpdateComponent>;
    let service: TrasteroLayoutService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InventarioTestModule],
        declarations: [TrasteroLayoutUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TrasteroLayoutUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrasteroLayoutUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrasteroLayoutService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TrasteroLayout(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TrasteroLayout();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

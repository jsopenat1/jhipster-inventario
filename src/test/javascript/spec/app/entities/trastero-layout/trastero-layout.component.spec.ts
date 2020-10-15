import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InventarioTestModule } from '../../../test.module';
import { TrasteroLayoutComponent } from 'app/entities/trastero-layout/trastero-layout.component';
import { TrasteroLayoutService } from 'app/entities/trastero-layout/trastero-layout.service';
import { TrasteroLayout } from 'app/shared/model/trastero-layout.model';

describe('Component Tests', () => {
  describe('TrasteroLayout Management Component', () => {
    let comp: TrasteroLayoutComponent;
    let fixture: ComponentFixture<TrasteroLayoutComponent>;
    let service: TrasteroLayoutService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InventarioTestModule],
        declarations: [TrasteroLayoutComponent],
      })
        .overrideTemplate(TrasteroLayoutComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrasteroLayoutComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrasteroLayoutService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TrasteroLayout(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.trasteroLayouts && comp.trasteroLayouts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

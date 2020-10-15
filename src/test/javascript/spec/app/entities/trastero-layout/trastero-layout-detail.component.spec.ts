import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InventarioTestModule } from '../../../test.module';
import { TrasteroLayoutDetailComponent } from 'app/entities/trastero-layout/trastero-layout-detail.component';
import { TrasteroLayout } from 'app/shared/model/trastero-layout.model';

describe('Component Tests', () => {
  describe('TrasteroLayout Management Detail Component', () => {
    let comp: TrasteroLayoutDetailComponent;
    let fixture: ComponentFixture<TrasteroLayoutDetailComponent>;
    const route = ({ data: of({ trasteroLayout: new TrasteroLayout(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InventarioTestModule],
        declarations: [TrasteroLayoutDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TrasteroLayoutDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrasteroLayoutDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load trasteroLayout on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.trasteroLayout).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

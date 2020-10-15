import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITrasteroLayout, TrasteroLayout } from 'app/shared/model/trastero-layout.model';
import { TrasteroLayoutService } from './trastero-layout.service';
import { TrasteroLayoutComponent } from './trastero-layout.component';
import { TrasteroLayoutDetailComponent } from './trastero-layout-detail.component';
import { TrasteroLayoutUpdateComponent } from './trastero-layout-update.component';

@Injectable({ providedIn: 'root' })
export class TrasteroLayoutResolve implements Resolve<ITrasteroLayout> {
  constructor(private service: TrasteroLayoutService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITrasteroLayout> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((trasteroLayout: HttpResponse<TrasteroLayout>) => {
          if (trasteroLayout.body) {
            return of(trasteroLayout.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TrasteroLayout());
  }
}

export const trasteroLayoutRoute: Routes = [
  {
    path: '',
    component: TrasteroLayoutComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'inventarioApp.trasteroLayout.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TrasteroLayoutDetailComponent,
    resolve: {
      trasteroLayout: TrasteroLayoutResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'inventarioApp.trasteroLayout.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrasteroLayoutUpdateComponent,
    resolve: {
      trasteroLayout: TrasteroLayoutResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'inventarioApp.trasteroLayout.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TrasteroLayoutUpdateComponent,
    resolve: {
      trasteroLayout: TrasteroLayoutResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'inventarioApp.trasteroLayout.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

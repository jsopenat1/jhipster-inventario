import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InventarioSharedModule } from 'app/shared/shared.module';
import { TrasteroLayoutComponent } from './trastero-layout.component';
import { TrasteroLayoutDetailComponent } from './trastero-layout-detail.component';
import { TrasteroLayoutUpdateComponent } from './trastero-layout-update.component';
import { TrasteroLayoutDeleteDialogComponent } from './trastero-layout-delete-dialog.component';
import { trasteroLayoutRoute } from './trastero-layout.route';

@NgModule({
  imports: [InventarioSharedModule, RouterModule.forChild(trasteroLayoutRoute)],
  declarations: [
    TrasteroLayoutComponent,
    TrasteroLayoutDetailComponent,
    TrasteroLayoutUpdateComponent,
    TrasteroLayoutDeleteDialogComponent,
  ],
  entryComponents: [TrasteroLayoutDeleteDialogComponent],
})
export class InventarioTrasteroLayoutModule {}

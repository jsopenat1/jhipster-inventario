import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InventarioSharedModule } from 'app/shared/shared.module';
import { MovimientoComponent } from './movimiento.component';
import { MovimientoDetailComponent } from './movimiento-detail.component';
import { MovimientoUpdateComponent } from './movimiento-update.component';
import { MovimientoDeleteDialogComponent } from './movimiento-delete-dialog.component';
import { movimientoRoute } from './movimiento.route';

@NgModule({
  imports: [InventarioSharedModule, RouterModule.forChild(movimientoRoute)],
  declarations: [MovimientoComponent, MovimientoDetailComponent, MovimientoUpdateComponent, MovimientoDeleteDialogComponent],
  entryComponents: [MovimientoDeleteDialogComponent],
})
export class InventarioMovimientoModule {}

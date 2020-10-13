import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InventarioSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [InventarioSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class InventarioHomeModule {}

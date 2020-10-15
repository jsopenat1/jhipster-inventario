import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.InventarioProductModule),
      },
      {
        path: 'product-category',
        loadChildren: () => import('./product-category/product-category.module').then(m => m.InventarioProductCategoryModule),
      },
      {
        path: 'trastero-layout',
        loadChildren: () => import('./trastero-layout/trastero-layout.module').then(m => m.InventarioTrasteroLayoutModule),
      },
      {
        path: 'movimiento',
        loadChildren: () => import('./movimiento/movimiento.module').then(m => m.InventarioMovimientoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class InventarioEntityModule {}

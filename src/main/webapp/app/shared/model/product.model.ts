import { IMovimiento } from 'app/shared/model/movimiento.model';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { ITrasteroLayout } from 'app/shared/model/trastero-layout.model';
import { Ubicacion } from 'app/shared/model/enumerations/ubicacion.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  cantidad?: number;
  ubicacion?: Ubicacion;
  image1ContentType?: string;
  image1?: any;
  image2ContentType?: string;
  image2?: any;
  movimientos?: IMovimiento[];
  productCategory?: IProductCategory;
  trastero?: ITrasteroLayout;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public cantidad?: number,
    public ubicacion?: Ubicacion,
    public image1ContentType?: string,
    public image1?: any,
    public image2ContentType?: string,
    public image2?: any,
    public movimientos?: IMovimiento[],
    public productCategory?: IProductCategory,
    public trastero?: ITrasteroLayout
  ) {}
}

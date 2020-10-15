import { IProduct } from 'app/shared/model/product.model';

export interface ITrasteroLayout {
  id?: number;
  name?: string;
  description?: string;
  products?: IProduct[];
}

export class TrasteroLayout implements ITrasteroLayout {
  constructor(public id?: number, public name?: string, public description?: string, public products?: IProduct[]) {}
}

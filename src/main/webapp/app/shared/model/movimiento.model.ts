import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IMovimiento {
  id?: number;
  whenDate?: Moment;
  description?: string;
  cantidad?: number;
  user?: IUser;
  product?: IProduct;
}

export class Movimiento implements IMovimiento {
  constructor(
    public id?: number,
    public whenDate?: Moment,
    public description?: string,
    public cantidad?: number,
    public user?: IUser,
    public product?: IProduct
  ) {}
}

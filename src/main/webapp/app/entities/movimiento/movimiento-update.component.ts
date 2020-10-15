import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMovimiento, Movimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from './movimiento.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

type SelectableEntity = IUser | IProduct;

@Component({
  selector: 'jhi-movimiento-update',
  templateUrl: './movimiento-update.component.html',
})
export class MovimientoUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  products: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    whenDate: [null, [Validators.required]],
    description: [],
    cantidad: [null, [Validators.required, Validators.min(1)]],
    user: [],
    product: [],
  });

  constructor(
    protected movimientoService: MovimientoService,
    protected userService: UserService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimiento }) => {
      if (!movimiento.id) {
        const today = moment().startOf('day');
        movimiento.whenDate = today;
      }

      this.updateForm(movimiento);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    });
  }

  updateForm(movimiento: IMovimiento): void {
    this.editForm.patchValue({
      id: movimiento.id,
      whenDate: movimiento.whenDate ? movimiento.whenDate.format(DATE_TIME_FORMAT) : null,
      description: movimiento.description,
      cantidad: movimiento.cantidad,
      user: movimiento.user,
      product: movimiento.product,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimiento = this.createFromForm();
    if (movimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoService.update(movimiento));
    } else {
      this.subscribeToSaveResponse(this.movimientoService.create(movimiento));
    }
  }

  private createFromForm(): IMovimiento {
    return {
      ...new Movimiento(),
      id: this.editForm.get(['id'])!.value,
      whenDate: this.editForm.get(['whenDate'])!.value ? moment(this.editForm.get(['whenDate'])!.value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      user: this.editForm.get(['user'])!.value,
      product: this.editForm.get(['product'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimiento>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}

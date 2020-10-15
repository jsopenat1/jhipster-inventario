import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITrasteroLayout, TrasteroLayout } from 'app/shared/model/trastero-layout.model';
import { TrasteroLayoutService } from './trastero-layout.service';

@Component({
  selector: 'jhi-trastero-layout-update',
  templateUrl: './trastero-layout-update.component.html',
})
export class TrasteroLayoutUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
  });

  constructor(protected trasteroLayoutService: TrasteroLayoutService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trasteroLayout }) => {
      this.updateForm(trasteroLayout);
    });
  }

  updateForm(trasteroLayout: ITrasteroLayout): void {
    this.editForm.patchValue({
      id: trasteroLayout.id,
      name: trasteroLayout.name,
      description: trasteroLayout.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const trasteroLayout = this.createFromForm();
    if (trasteroLayout.id !== undefined) {
      this.subscribeToSaveResponse(this.trasteroLayoutService.update(trasteroLayout));
    } else {
      this.subscribeToSaveResponse(this.trasteroLayoutService.create(trasteroLayout));
    }
  }

  private createFromForm(): ITrasteroLayout {
    return {
      ...new TrasteroLayout(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrasteroLayout>>): void {
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
}

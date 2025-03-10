import { AsyncPipe } from '@angular/common';
import type { TemplateRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiAutoFocus, TuiDay } from '@taiga-ui/cdk';
import type { TuiDialogContext } from '@taiga-ui/core';
import { TuiButton, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiSlider } from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
  TuiInputDateModule
} from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { IEvent } from '../../../interfaces/event';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-product-dialog',
  imports: [
    FormsModule,
    TuiAutoFocus,
    TuiButton,
    TuiDataListWrapper,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiInputDateModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.less'
})
export class ProductDialogComponent {
  private readonly dialogs = inject(TuiDialogService);

  public readonly context =
    injectContext<
      TuiDialogContext<Product, Product>
    >();

  protected get hasValue(): boolean {
    return this.data.name.trim() !== '';
  }

  protected get data(): Product {
    return this.context.data;
  }

  protected submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.hasValue) {
      this.context.completeWith(this.data);
    }
  }

  protected showDialog(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, { dismissible: true }).subscribe();
  }
}

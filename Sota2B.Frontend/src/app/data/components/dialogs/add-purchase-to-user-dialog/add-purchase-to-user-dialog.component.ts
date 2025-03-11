import { Component, inject, TemplateRef } from '@angular/core';
import { TuiButton, TuiDataList, TuiDialogContext, TuiDialogService, TuiSelect } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../interfaces/product';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { ProductCardComponent } from "../../cards/product-card/product-card.component";

@Component({
  selector: 'app-add-purchase-to-user-dialog',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiButton,
    CommonModule,
    ReactiveFormsModule,
    TuiDataList,
    TuiDataListWrapper,
    TuiSelect,
    ProductCardComponent
],
  templateUrl: './add-purchase-to-user-dialog.component.html',
  styleUrls: ['./add-purchase-to-user-dialog.component.less'],
})
export class AddPurchaseToUserDialogComponent {
  private readonly dialogs = inject(TuiDialogService);
  protected products: Product[] = []; 
  public readonly context = injectContext<TuiDialogContext<number, Product[]>>();

  ngOnInit(): void {
    this.products = this.context.data || []; // Убедитесь, что данные загружаются
    console.log(this.products); // Для отладки
  }

  protected submit(product: Product, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.context.completeWith(product.id);
  }
}

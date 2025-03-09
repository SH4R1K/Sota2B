import {
  Component,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { UserCardComponent } from '../../components/cards/user-card/user-card.component';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../../services/product-service.service';
import { ProductCardComponent } from "../../components/cards/product-card/product-card.component";
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { ProductDialogComponent } from '../../components/dialogs/product-dialog/product-dialog.component';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-products-page',
  imports: [
    CommonModule,
    UserCardComponent,
    ProductCardComponent,
    TuiButton
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.less'
})

export class ProductsPageComponent {
  event: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0
  };
  products: Product[] = [];
  private sub: Subscription | null = null;

  private readonly dialog = tuiDialog(ProductDialogComponent, {
    dismissible: true,
    label: 'Создать продукт',
  });
  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: (value) => {
        this.products = value;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  protected showDialog(): void {
    this.dialog({ ...this.event }).subscribe({
      next: (data) => {
        this.products.unshift(data)
        this.productService.createProduct(data).subscribe({
          next: (data) => {
            console.log(data)
          }
        })
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }
}

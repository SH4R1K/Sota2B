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
import { TuiButton } from '@taiga-ui/core';

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
    products: Product[] = [];
    private sub: Subscription | null = null;
    constructor(private productService: ProductService){
      
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
}

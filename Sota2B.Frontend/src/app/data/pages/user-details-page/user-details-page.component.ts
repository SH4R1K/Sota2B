import {
  Component,
} from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { UserCardComponent } from '../../components/cards/user-card/user-card.component';
import { UserDetails } from '../../interfaces/userDetails';
import { ActivatedRoute } from '@angular/router';
import { EventCardComponent } from "../../components/cards/event-card/event-card.component";
import { AchievementCardComponent } from "../../components/cards/achievement-card/achievement-card.component";
import { PurchaseCardComponent } from "../../components/cards/purchase-card/purchase-card.component";
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { UserDialogComponent } from '../../components/dialogs/user-dialog/user-dialog.component';
import { AddPurchaseToUserDialogComponent } from '../../components/dialogs/add-purchase-to-user-dialog/add-purchase-to-user-dialog.component';
import { ProductService } from '../../../services/product-service.service';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-user-details-page',
  imports: [AchievementCardComponent, CommonModule, TuiButton],
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.less'
})
export class UserDetailsPageComponent {
  user!: UserDetails;
  products: Product[] = [];
  idUser!: number;
  sortDirection: boolean = false;
  sortPurchaseDirection: boolean = false;
  private sub: Subscription | null = null;
  constructor(private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idUser = params['idUser'];
    })
    this.userService.getUser(this.idUser).subscribe({
      next: (value) => {
        this.user = value;
        this.sortEventsByDate();
        this.sortPurchasesByDate();
      },
    });
    this.productService.getProducts().subscribe({
      next: (value) => {
        this.products = value;
      },
    });
  }

  protected sortEventsByDate() {
    this.user.events.sort((a, b) => {
      return this.sortDirection 
        ? new Date(a.endDate!).getTime() - new Date(b.endDate!).getTime() 
        : new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime();
    });
  }

  protected sortPurchasesByDate() {
    this.user.purchases.sort((a, b) => {
      return this.sortDirection 
        ? new Date(a.purchaseDate!).getTime() - new Date(b.purchaseDate!).getTime() 
        : new Date(b.purchaseDate!).getTime() - new Date(a.purchaseDate!).getTime();
    });
  }
  private readonly editDialog = tuiDialog(UserDialogComponent, {
    dismissible: true,
    label: 'Редактировать пользователя',
  });

  private readonly purchaseDialog = tuiDialog(AddPurchaseToUserDialogComponent, {
    dismissible: true,
    label: 'Совершить покупку',
  });

  protected showPurchaseDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.purchaseDialog(this.products).subscribe({
      next: (product) => {
        this.userService.addUserProduct(this.idUser, product).subscribe({
          next: (value) => {
            this.user.purchases.push(value)
          }
        })
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  protected showEditDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.editDialog({ ...this.user }).subscribe({
      next: (updUser) => {
        this.userService.updateUser(this.user.id, updUser).subscribe({
          next: (data) => {
            this.user.name = updUser.name;
          }
        })
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }
}

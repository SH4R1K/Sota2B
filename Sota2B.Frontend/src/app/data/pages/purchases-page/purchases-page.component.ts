import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { Subscription } from 'rxjs';
import { Purchase } from '../../interfaces/purchase';
import { ActivatedRoute } from '@angular/router';
import { PurchaseCardComponent } from "../../components/cards/purchase-card/purchase-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchases-page',
  imports: [PurchaseCardComponent, CommonModule],
  templateUrl: './purchases-page.component.html',
  styleUrl: './purchases-page.component.less'
})
export class PurchasesPageComponent {
  purchases: Purchase[] = [];
  idUser!: number;
  private sub: Subscription | null = null;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
    this.idUser = params['idUser'];
    })
    this.sub = this.userService.getUserPurchases(this.idUser).subscribe({
      next: (value) => {
        this.purchases = value;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

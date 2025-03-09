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

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-user-details-page',
  imports: [EventCardComponent, AchievementCardComponent, PurchaseCardComponent, CommonModule],
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.less'
})
export class UserDetailsPageComponent {
    user!: UserDetails;
    idUser!: number;
    private sub: Subscription | null = null;
    constructor(private userService: UserService,
      private route: ActivatedRoute,){
      
    }

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
      this.idUser = params['idUser'];
      })
      this.sub = this.userService.getUser(this.idUser).subscribe({
        next: (value) => {
          this.user = value;
        },
      });
    }

    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
}

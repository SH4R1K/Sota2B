import {
  Component,
} from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { UserCardComponent } from '../../components/cards/user-card/user-card.component';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-users-rating-page',
  imports: [
    CommonModule,
],
  templateUrl: './users-rating-page.component.html',
  styleUrl: './users-rating-page.component.less'
})
export class UsersRatingPageComponent {
    users: User[] = [];
    private sub: Subscription | null = null;
    constructor(private userService: UserService){
      
    }

    ngOnInit(): void {
      this.sub = this.userService.getUsersRating().subscribe({
        next: (value) => {
          this.users = value;
        },
      });
    }

    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
}

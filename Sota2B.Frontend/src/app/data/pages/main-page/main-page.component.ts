import {
  Component,
} from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-main-page',
  imports: [
    CommonModule,
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.less'
})
export class MainPageComponent {
    users: User[] = [];
    private sub: Subscription | null = null;
    constructor(private userService: UserService){
      
    }

    ngOnInit(): void {
      this.sub = this.userService.getUsers().subscribe({
        next: (value) => {
          this.users = value;
        },
      });
    }

    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
}

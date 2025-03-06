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
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { UserDialogComponent } from '../../components/dialogs/user-dialog/user-dialog.component';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-users-page',
  imports: [
    CommonModule,
    UserCardComponent,
    TuiButton

],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.less'
})
export class UsersPageComponent {
  user: User = {
    id: 0,
    name: '',
    points: 0
  };

  private readonly dialog = tuiDialog(UserDialogComponent, {
    dismissible: true,
    label: 'Создать пользователя',
  });
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
    protected showDialog(): void {
      this.dialog({ ...this.user }).subscribe({
        next: (data) => {
          this.users.unshift(data)
          this.userService.createUser(data).subscribe({
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

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiPlatform } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButton, tuiDialog, TuiIcon, TuiLink, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar, TuiBadge } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { User } from '../../../interfaces/user';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';
import { UserService } from '../../../../services/user-service.service';

@Component({
  selector: "app-user-card",
  imports: [
    TuiAppearance,
    TuiButton,
    TuiAvatar,
    RouterModule,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    CommonModule,
    TuiIcon
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.less',
})
export class UserCardComponent {
  @Input() userInfo!: User;

  constructor(private userService: UserService) {

  }

  private readonly dialog = tuiDialog(UserDialogComponent, {
    dismissible: true,
    label: 'Редактировать пользователя',
  });

  protected showDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.dialog({ ...this.userInfo }).subscribe({
      next: (updUser) => {
        this.userService.updateUser(this.userInfo.id, updUser).subscribe({
          next: (data) => {
            this.userInfo = updUser;
          }
        })
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }
}

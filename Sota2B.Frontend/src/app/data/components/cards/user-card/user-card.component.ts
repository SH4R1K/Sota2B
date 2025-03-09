import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiPlatform } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButton, TuiIcon, TuiLink, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar, TuiBadge } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { User } from '../../../interfaces/user';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
}

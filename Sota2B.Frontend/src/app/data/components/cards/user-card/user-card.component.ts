import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiPlatform } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButton, TuiLink, TuiTitle } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { User } from '../../../interfaces/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: "app-user-card",
  imports: [
    TuiAppearance,
    TuiButton,
    RouterModule,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.less'
})
export class UserCardComponent {
  @Input() userInfo!: User;
}

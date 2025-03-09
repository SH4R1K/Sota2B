import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TuiAppearance, TuiIcon, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiCardLarge, TuiCell, TuiHeader} from '@taiga-ui/layout';
import { RouterModule } from '@angular/router';
import { Achievement } from '../../../interfaces/achievement';

@Component({
  selector: 'app-achievement-card',
  imports: [
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    RouterModule,
    TuiSurface,
    TuiTitle,
  TuiAvatar],
  templateUrl: './achievement-card.component.html',
  styleUrl: './achievement-card.component.less'
})
export class AchievementCardComponent {
  @Input() achievementInfo!: Achievement;
}

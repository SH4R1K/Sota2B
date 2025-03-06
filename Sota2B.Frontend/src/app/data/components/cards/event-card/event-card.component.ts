import { IEvent } from '../../../interfaces/event';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TuiAppearance, TuiIcon, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiCardLarge, TuiCell, TuiHeader} from '@taiga-ui/layout';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-event-card',
  imports: [
      TuiAppearance,
      TuiCardLarge,
      TuiHeader,
      RouterModule,
      TuiSurface,
      TuiTitle],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.less'
})
export class EventCardComponent {
  @Input() eventInfo!: IEvent;
}

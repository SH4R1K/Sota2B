import { IEvent } from '../../../interfaces/event';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TuiAppearance, tuiDialog, TuiIcon, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiCardLarge, TuiCell, TuiHeader} from '@taiga-ui/layout';
import { RouterModule } from '@angular/router';
import { EventService } from '../../../../services/event-service.service';
import { EventDialogComponent } from '../../dialogs/event-dialog/event-dialog.component';
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

    constructor(private eventService: EventService) {
  
    }
  
    private readonly dialog = tuiDialog(EventDialogComponent, {
      dismissible: true,
      label: 'Редактировать событие',
    });
  
    protected showDialog(event: MouseEvent): void {
      event.stopPropagation();
      this.dialog({ ...this.eventInfo }).subscribe({
        next: (updEvent) => {
          console.log(updEvent.startDate)
          this.eventService.updateEvent(this.eventInfo.id, updEvent).subscribe({
            next: (data) => {
              this.eventInfo = updEvent;
            }
          })
        },
        complete: () => {
          console.info('Dialog closed');
        },
      });
    }
}

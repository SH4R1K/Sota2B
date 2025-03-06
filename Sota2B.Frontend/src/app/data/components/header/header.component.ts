import { Component } from '@angular/core';
import { tuiDialog } from '@taiga-ui/core';
import { EventDialogComponent } from '../dialogs/event-dialog/event-dialog.component';
import { IEvent } from '../../interfaces/event';
import { EventService } from '../../../services/event-service.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  event: IEvent = {
    id: 0,
    name: '',
    description: '',
    reward: 0,
    startDate: new Date(),
    endDate: new Date()
  };
  constructor (private eventService: EventService) {

  }
  private readonly dialog = tuiDialog(EventDialogComponent, {
    dismissible: true,
    label: 'Событие',
});

protected showDialog(): void {
    this.dialog({ ...this.event}).subscribe({
        next: (data) => {
          this.eventService.createEvent(data).subscribe({ next: (data) => {
          console.log(1)
          }})
        },
        complete: () => {
            console.info('Dialog closed');
        },
    });
}
}

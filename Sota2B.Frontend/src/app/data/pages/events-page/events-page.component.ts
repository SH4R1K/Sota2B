import { Component } from '@angular/core';
import { EventService } from '../../../services/event-service.service';
import { Subscription } from 'rxjs';
import { IEvent } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-service.service';
import { EventCardComponent } from "../../components/cards/event-card/event-card.component";
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { EventDialogComponent } from '../../components/dialogs/event-dialog/event-dialog.component';

@Component({
  selector: 'app-events-page',
  imports: [CommonModule, EventCardComponent, TuiButton],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.less'
})
export class EventsPageComponent {

  event: IEvent = {
    id: 0,
    name: '',
    description: '',
    reward: 0,
  };

  private readonly dialog = tuiDialog(EventDialogComponent, {
    dismissible: true,
    label: 'Создать событие',
  });

  events: IEvent[] = [];
  idUser!: number;
  private sub: Subscription | null = null;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idUser = params['idUser'];
    })
    this.sub = this.eventService.getEvents().subscribe({
      next: (value) => {
        this.events = value;
      },
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  protected showDialog(): void {
    this.dialog({ ...this.event }).subscribe({
      next: (data) => {
        this.events.unshift(data)
        this.eventService.createEvent(data).subscribe({
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

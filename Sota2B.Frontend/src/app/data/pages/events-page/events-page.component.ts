import { Component } from '@angular/core';
import { EventService } from '../../../services/event-service.service';
import { Subscription } from 'rxjs';
import { IEvent } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-service.service';
import { EventCardComponent } from "../../components/cards/event-card/event-card.component";

@Component({
  selector: 'app-events-page',
  imports: [CommonModule, EventCardComponent],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.less'
})
export class EventsPageComponent {

    events: IEvent[] = [];
    idUser!: number;
    private sub: Subscription | null = null;
    constructor(
      private eventService: EventService,
      private route: ActivatedRoute,
    ){
      
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
}

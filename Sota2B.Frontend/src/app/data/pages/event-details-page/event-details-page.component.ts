import {
  Component,
} from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { UserCardComponent } from '../../components/cards/user-card/user-card.component';
import { UserDetails } from '../../interfaces/userDetails';
import { ActivatedRoute } from '@angular/router';
import { EventCardComponent } from "../../components/cards/event-card/event-card.component";
import { AchievementCardComponent } from "../../components/cards/achievement-card/achievement-card.component";
import { PurchaseCardComponent } from "../../components/cards/purchase-card/purchase-card.component";
import { EventService } from '../../../services/event-service.service';
import { IEvent } from '../../interfaces/event';
import { EventDetails } from '../../interfaces/eventDetails';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-event-details-page',
  imports: [EventCardComponent, AchievementCardComponent, PurchaseCardComponent, CommonModule, UserCardComponent],
  templateUrl: './event-details-page.component.html',
  styleUrl: './event-details-page.component.less'
})
export class EventDetailsPageComponent {
  event!: EventDetails;
  idEvent!: number;
  private sub: Subscription | null = null;
  constructor(private eventService: EventService,
    private route: ActivatedRoute,){
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
    this.idEvent = params['idEvent'];
    })
    this.sub = this.eventService.getEvent(this.idEvent).subscribe({
      next: (value) => {
        this.event = value;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

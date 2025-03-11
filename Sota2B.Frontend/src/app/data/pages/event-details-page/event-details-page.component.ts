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
import { tuiDialog } from '@taiga-ui/core';
import { EventDialogComponent } from '../../components/dialogs/event-dialog/event-dialog.component';
import { AddUserToEventDialogComponent } from '../../components/dialogs/add-user-to-event-dialog/add-user-to-event-dialog.component';

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
  users: User[] = [];
  idEvent!: number;

  constructor(private eventService: EventService, private userService: UserService,
    private route: ActivatedRoute,) {

  }

  private readonly dialog = tuiDialog(AddUserToEventDialogComponent, {
    dismissible: true,
    label: 'Управлять участниками',
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idEvent = params['idEvent'];
    })
    this.loadEventData();
    this.userService.getUsers().subscribe({
      next: (value) => {
        this.users = value;
      }
    })
  }

  private loadEventData() {
    this.eventService.getEvent(this.idEvent).subscribe({
      next: (value) => {
        this.event = value;
      },
    });
  }


  protected showDialog(): void {
    const dialogData = {
      allUsers: this.users, 
      selectedUsers: this.event.userWasOnEvent, 
    };
    this.dialog(dialogData).subscribe({
      next: (data) => {
        this.eventService.patchEvent(this.idEvent, data).subscribe({
          next: (value) => {
            this.loadEventData();
          }
        })
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }
}

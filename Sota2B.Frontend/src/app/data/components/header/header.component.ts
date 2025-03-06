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
}

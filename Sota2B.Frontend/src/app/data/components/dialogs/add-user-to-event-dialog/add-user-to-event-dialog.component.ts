import { Component, inject, TemplateRef } from '@angular/core';
import { TuiButton, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { TuiContext, TuiHandler } from '@taiga-ui/cdk';
import { TUI_DEFAULT_MATCHER, tuiIsNumber, TuiLet } from '@taiga-ui/cdk';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { TuiMultiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import type { Observable } from 'rxjs';
import { map, shareReplay, startWith, Subject, switchMap, timer } from 'rxjs';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-add-user-to-event-dialog',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiDataList,
    TuiDataListWrapper,
    TuiLet,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiButton
  ],
  templateUrl: './add-user-to-event-dialog.component.html',
  styleUrl: './add-user-to-event-dialog.component.less',
  providers: [
    tuiItemsHandlersProvider({
      identityMatcher: (item1: User, item2: User) => item1.id === item2.id,
      stringify: (item: User) => item.name
    }),
  ],
})
export class AddUserToEventDialogComponent {
  protected readonly selectedValue = new FormControl<User[]>([]);
  stringifyUser = (user: User): string => user.name;
  private readonly dialogs = inject(TuiDialogService);

  public readonly context =
    injectContext<
      TuiDialogContext<Number[], { allUsers: User[], selectedUsers: User[] }>
    >();

  protected get data(): User[] {
    return this.context.data.allUsers;
  }

  ngOnInit(): void {
    this.selectedValue.setValue(this.context.data.selectedUsers)
  }

  protected submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.context.completeWith(this.selectedValue.value!.map(item => item.id));
  }
  
  protected showDialog(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, { dismissible: true }).subscribe();
  }
}

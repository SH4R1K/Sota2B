import { AsyncPipe } from '@angular/common';
import type { TemplateRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiAutoFocus, TuiDay, TuiTime } from '@taiga-ui/cdk';
import type { TuiDialogContext } from '@taiga-ui/core';
import { TuiButton, tuiDialog, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiSlider } from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
  TuiInputDateModule
} from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { IEvent } from '../../../interfaces/event';
import { ENativeDateTransformer } from '../../../transformers/native-date-transofrmer.directive';
import { AchievementDialogComponent } from '../achievement-dialog/achievement-dialog.component';
import { Achievement } from '../../../interfaces/achievement';
import { PostAchievement } from '../../../interfaces/postAchievement';
@Component({
  selector: 'app-event-dialog',
  imports: [
    FormsModule,
    TuiAutoFocus,
    TuiButton,
    TuiDataListWrapper,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiInputDateModule,
    ENativeDateTransformer
  ],
  templateUrl: './event-dialog.component.html',
  styleUrl: './event-dialog.component.less'
})

export class EventDialogComponent {
  private readonly dialogs = inject(TuiDialogService);

  public readonly context =
    injectContext<
      TuiDialogContext<IEvent, IEvent>
    >();
  achievement: PostAchievement = {
    name: this.context.data.achievement?.name || '',
    description: this.context.data.achievement?.description || ''
  }
  private readonly dialog = tuiDialog(AchievementDialogComponent, {
    dismissible: true,
    label: 'Достижение',
  });

  protected from: TuiDay | null = null;
  protected to: TuiDay | null = null;
  protected min = new TuiDay(2000, 1, 1);

  protected get hasValue(): boolean {
    return this.data.name.trim() !== '';
  }

  protected get data(): IEvent {
    return this.context.data;
  }

  protected submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.hasValue) {
      this.context.completeWith(this.data);
    }
  }
  protected openAchievementDialog(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.dialog(this.achievement).subscribe({next: (value) => {
        this.context.data.achievement = value;
    }})
  }


  protected showDialog(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, { dismissible: true }).subscribe();
  }
}

import { Component, inject, TemplateRef } from '@angular/core';
import { TuiButton, TuiDialogContext, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { Achievement } from '../../../interfaces/achievement';
import { FormsModule } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiDataListWrapper, TuiSlider } from '@taiga-ui/kit';
import { TuiInputDateModule, TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { PostAchievement } from '../../../interfaces/postAchievement';

@Component({
  selector: 'app-achievement-dialog',
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
    ],
  templateUrl: './achievement-dialog.component.html',
  styleUrl: './achievement-dialog.component.less'
})
export class AchievementDialogComponent {
  private readonly dialogs = inject(TuiDialogService);

  public readonly context =
    injectContext<
      TuiDialogContext<PostAchievement, PostAchievement>
    >();

  protected get hasValue(): boolean {
    return this.data.name.trim() !== '';
  }

  protected get data(): PostAchievement {
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

  protected showDialog(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, { dismissible: true }).subscribe();
  }
}

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TuiAppearance, TuiIcon, TuiSurface, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiCardLarge, TuiCell, TuiHeader} from '@taiga-ui/layout';
import { RouterModule } from '@angular/router';
import { Purchase } from '../../../interfaces/purchase';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchase-card',
  imports: [
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    RouterModule,
    TuiSurface,
    TuiTitle],
  templateUrl: './purchase-card.component.html',
  styleUrl: './purchase-card.component.less',
  providers: [DatePipe]
})
export class PurchaseCardComponent {
  @Input() purchaseInfo!: Purchase;
  formattedDate?: string;
  constructor(private datepipe: DatePipe){
    
  } 
  ngOnInit() {
    this.formatDate();
  }

  ngOnChanges() {
    this.formatDate();
  }

  private formatDate() {
    if (this.purchaseInfo && this.purchaseInfo.purchaseDate) {
      this.formattedDate = this.datepipe.transform(this.purchaseInfo.purchaseDate, 'yyyy/MM/dd')!;
    }
  }
}

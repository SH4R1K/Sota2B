import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiPlatform } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButton, TuiLink, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar, TuiBadge } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { RouterModule } from '@angular/router';
import { Product } from '../../../interfaces/product';

@Component({
  selector: "app-product-card",
  imports: [
    TuiAppearance,
    TuiButton,
    TuiAvatar,
    RouterModule,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.less'
})
export class ProductCardComponent {
  @Input() productInfo!: Product;
}

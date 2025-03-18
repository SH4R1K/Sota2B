import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiRingChart } from '@taiga-ui/addon-charts';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { tuiSum } from '@taiga-ui/cdk';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-rating-ring-chart',
  imports: [AsyncPipe, TuiAmountPipe, TuiRingChart],
  templateUrl: './rating-ring-chart.component.html',
  styleUrl: './rating-ring-chart.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingRingChartComponent {
  @Input() users: User[] = [];
  labels: string[] = [];
  value: number[] = [];
  percents: number[] = [];
  index = NaN;
  private total = 0;

  ngOnInit(): void {
    this.updateChartData();
  }

  ngOnChanges(): void {
    this.updateChartData();
  }

  private updateChartData(): void {
    const validUsers = this.users.filter(user => (user.points || 0) >= 0);

    this.labels = validUsers.map(user => user.name);
    this.value = validUsers.map(user => user.points || 0);
    this.total = validUsers.reduce((acc, obj) => acc + (obj.points || 0), 0);
    this.percents =  this.value.map(val => 
      this.total > 0 ? parseFloat(((val / this.total) * 100).toFixed(2)) : 0
    );
  }
  protected get sum(): number {
    return (Number.isNaN(this.index) ? this.total : this.value[this.index]) ?? 0;
  }

  protected get percent(): number {
    return (Number.isNaN(this.index) ? 100 : this.percents[this.index]) ?? 0;
  }

  protected get label(): string {
    return (Number.isNaN(this.index) ? 'Всего' : this.labels[this.index]) ?? '';
  }
}

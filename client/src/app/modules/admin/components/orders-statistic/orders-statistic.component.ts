import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-orders-statistic',
  standalone: true,
  templateUrl: './orders-statistic.component.html',
  imports: [MatTableModule],
  styleUrl: './orders-statistic.component.scss',
})
export class OrdersStatisticComponent {
  displayedColumns = ['item', 'cost'];
  transactions = [
    { item: 'Total', value: 4 },
    { item: 'In work', value: 5 },
    { item: 'Null', value: 2 },
    { item: 'Agree', value: 4 },
    { item: 'Disagree', value: 25 },
    { item: 'New', value: 15 },
    { item: 'Dubbing', value: 15 },
  ];

  getTotalCost() {
    return this.transactions
      .map(t => t.value)
      .reduce((acc, value) => acc + value, 0);
  }
}

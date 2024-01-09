import { Component } from '@angular/core';
import { OrdersStatisticComponent } from '../../components/orders-statistic/orders-statistic.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [OrdersStatisticComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {}

import { Component } from '@angular/core';
import { AuthService } from '../../../../services';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent {
  isOrders: boolean;
  constructor(private authService: AuthService) {}
}

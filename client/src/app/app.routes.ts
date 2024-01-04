import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'orders', pathMatch: "full"
  },
  {
    path: 'orders', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
];

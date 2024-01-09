import { Routes } from '@angular/router';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { OrdersPageComponent } from './modules/orders/pages/orders-page/orders-page.component';
import { RegisterPageComponent } from './modules/auth/pages/register-page/register-page.component';
import { ErrorPageComponent } from './modules/error-page/error-page.component';
import {AdminPageComponent} from "./modules/admin/pages/admin-page/admin-page.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
  {
    path: 'orders',
    component: OrdersPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

import { Routes } from '@angular/router';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { ApplicationsPageComponent } from './modules/applications/pages/applications-page/applications-page.component';
import { RegisterPageComponent } from './modules/auth/pages/register-page/register-page.component';
import { ErrorPageComponent } from './modules/error-page/error-page.component';
import { AdminPageComponent } from './modules/admin/pages/admin-page/admin-page.component';
import { authGuard } from './guards/auth-guard';
import { ApplicationUpdatePageComponent } from './modules/applications/pages/application-update-page/application-update-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'applications',
    pathMatch: 'full',
  },
  {
    path: 'applications',
    component: ApplicationsPageComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'update/:id',
    component: ApplicationUpdatePageComponent,
    canActivate: [authGuard()],
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
    canActivate: [authGuard()],
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  template: '',
})
export class LoginPageComponent {
  constructor(private matDialog: MatDialog) {
    this.matDialog.open(LoginFormComponent, {
      disableClose: true,
      enterAnimationDuration: '0.5s',
      exitAnimationDuration: '0.5s',
      hasBackdrop: false,
    });
  }
}

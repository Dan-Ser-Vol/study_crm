import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { filter } from 'rxjs';
import {LoginFormComponent} from "./modules/auth/components/login-form/login-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainLayoutComponent],
  template: '<app-main-layout/>',
})
export class AppComponent {
  constructor(
    private matDialog: MatDialog,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.matDialog.closeAll();
      });
  }

}

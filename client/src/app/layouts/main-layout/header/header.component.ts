import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, NavigationService } from '../../../services';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {IManager} from "../../../interfaces";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  manager: IManager;
  isAuth: boolean;

  constructor(
    public authService: AuthService,
    private navigator: NavigationService
  ) {}

  ngOnInit() {
    this.authService.getMe().subscribe(value => (this.manager = value));
    this.authService.getIsAuth().subscribe(value => (this.isAuth = value));
    if (this.isAuth && !this.manager) {
      this.authService.me().subscribe();
    }
  }

  logout() {
    this.authService.logout().subscribe();
    this.authService.getTrigger().subscribe();
  }

  goBack(): void {
    this.navigator.back();
  }
}

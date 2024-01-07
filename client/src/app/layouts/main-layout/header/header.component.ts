import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services';
import { MatCardModule } from '@angular/material/card';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, RouterLinkActive, MatCardModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: IUser;
  isAuth: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.getIsAuth().subscribe(value => (this.isAuth = value));
    this.authService.getMe().subscribe(value => (this.user = value));
    if (this.isAuth && !this.user) {
      this.authService.me().subscribe();
    }
  }
}

import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isAuth = false
}

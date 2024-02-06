import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MatToolbarModule, HeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}

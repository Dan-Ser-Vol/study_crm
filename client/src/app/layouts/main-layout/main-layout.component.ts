import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApplicationsService } from '../../services';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MatToolbarModule,
    HeaderComponent,
    RouterOutlet,
    MatProgressSpinnerModule,
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  isLoaded: boolean = false;

  constructor(private appService: ApplicationsService) {}

  ngOnInit(): void {
    this.appService.getIsLoad().subscribe(value => {
      if (value) {
        this.isLoaded = value;
      }
    });
  }
}

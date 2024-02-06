import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-manager-item',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './manager-item.component.html',
  styleUrl: './manager-item.component.scss',
})
export class ManagerItemComponent {}

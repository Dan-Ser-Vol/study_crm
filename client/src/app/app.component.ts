import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<ul>
    @for (item of items; track item) {
      <li>{{item}}</li>
    }
  </ul>`,
})
export class AppComponent {
  items = ['Bob', 'Gig', 'Loch']
}

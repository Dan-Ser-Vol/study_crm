import { Component, Input } from '@angular/core';
import { ApplicationItemComponent } from '../application-item/application-item.component';
import { IApplication } from '../../../../interfaces';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [ApplicationItemComponent, MatExpansionModule],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.scss',
})
export class ApplicationsListComponent {
  @Input()
  applications: IApplication[];
}

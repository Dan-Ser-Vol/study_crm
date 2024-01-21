import { Component, Input, ViewChild } from '@angular/core';
import { IApplication } from '../../../../interfaces';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-application-item',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule],
  templateUrl: './application-item.component.html',
  styleUrl: './application-item.component.scss',
})
export class ApplicationItemComponent {
  panelOpenState = false;

  @Input()
  app: IApplication;

  @ViewChild(MatAccordion) accordion: MatAccordion;
}

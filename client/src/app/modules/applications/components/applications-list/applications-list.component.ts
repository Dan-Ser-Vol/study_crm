import { Component, Input, OnInit } from '@angular/core';
import { ApplicationItemComponent } from '../application-item/application-item.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { IApplication } from '../../../../interfaces';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [
    ApplicationItemComponent,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.scss',
})
export class ApplicationsListComponent implements OnInit {
  @Input()
  applications: IApplication[];
  columnsToDisplay = [
    'name',
    'surname',
    'email',
    'phone',
    'age',
    'course',
    'course_format',
    'course_type',
    'status',
    'sum',
    'group',
    'alreadyPaid',
    'created_at',
    'manager',
  ];

  expandedElement: PeriodicElement | null;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  ngOnInit() {
    console.log(this.applications);
  }
}

interface PeriodicElement {
  name: string;
  surname: string;
  email: string;
  phone: number;
  age: number;
}

import { Component, Input, OnInit } from '@angular/core';
import { ApplicationItemComponent } from '../application-item/application-item.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { IApplication, IFilter } from '../../../../interfaces';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApplicationsService } from '../../../../services';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [
    ApplicationItemComponent,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
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

  sortedBy: string | null;
  sortSymbol: string;
  filters: IFilter;

  expandedElement: PeriodicElement | null;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  constructor(
    private router: Router,
    private appService: ApplicationsService
  ) {}

  ngOnInit() {
    this.appService.getFilterItems().subscribe(value => {
      this.filters = value;
      const queryParams = { ...this.filters };
      this.router.navigate([], { queryParams });
    });
  }

  onSortBy(column: string) {
    if (this.sortedBy === column) {
      this.sortSymbol = this.sortSymbol === '' ? '-' : '';
    } else {
      this.sortedBy = column;
      this.sortSymbol = '';
    }

    console.log(this.filters);

    const queryParams = this.buildQueryParams(this.filters);
    this.router.navigate([], {
      queryParams,
    });
  }

  private buildQueryParams(filters: IFilter): any {
    const queryParams = { ...filters };
    queryParams['sortedBy'] = `${this.sortSymbol}${this.sortedBy}`;
    return queryParams;
  }
}

interface PeriodicElement {
  name: string;
  surname: string;
  email: string;
  phone: number;
  age: number;
}

import { Component, Input, OnInit } from '@angular/core';
import { IApplication, IFilter } from '../../../../interfaces';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { columnsDisplay } from '../../utils';
import { PeriodicElement } from '../../enums/periodic-enum';
import { Router } from '@angular/router';
import { ApplicationsService } from '../../../../services';
import { MessageFormComponent } from '../message-form/message-form.component';
import { IUser } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-application-item',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MessageFormComponent,
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

  templateUrl: './application-item.component.html',
  styleUrl: './application-item.component.scss',
})
export class ApplicationItemComponent implements OnInit {
  @Input() applications: IApplication[];
  @Input() me!: IUser;
  messages: string[];
  columnsToDisplay: string[] = columnsDisplay;
  sortedBy: string | null;
  sortSymbol: string;
  filters: IFilter;

  expandedElement: PeriodicElement | null;
  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expand'];

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

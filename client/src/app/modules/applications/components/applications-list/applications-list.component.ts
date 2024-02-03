import { Component, Input, OnInit } from '@angular/core';
import { ApplicationItemComponent } from '../application-item/application-item.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { IApplication, IFilter, IMessage } from '../../../../interfaces';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApplicationsService } from '../../../../services';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PeriodicElement } from '../../enums/periodic-enum';
import { columnsDisplay } from '../../utils';

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
    ReactiveFormsModule,
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
  messages: string[];
  columnsToDisplay = columnsDisplay;
  sortedBy: string | null;
  sortSymbol: string;
  filters: IFilter;
  messageForm: FormGroup;

  expandedElement: PeriodicElement | null;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  constructor(
    private router: Router,
    private appService: ApplicationsService
  ) {}

  ngOnInit() {
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
    this.appService.getFilterItems().subscribe(value => {
      this.filters = value;
      const queryParams = { ...this.filters };
      this.router.navigate([], { queryParams });
    });

    this.appService.getTriggerSubj().subscribe(() => {
      this.appService.getAll().subscribe(value => {
        this.applications = value.data;
      });
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

  onSubmit(id: string) {
    if (this.messageForm.valid || this.messageForm.value) {
      const msg = this.messageForm.value;
      this.appService.createMessage(id, msg).subscribe();
      this.appService.setTriggerSubj();
      this.messageForm.reset();
    }
  }

  private buildQueryParams(filters: IFilter): any {
    const queryParams = { ...filters };
    queryParams['sortedBy'] = `${this.sortSymbol}${this.sortedBy}`;
    return queryParams;
  }
}

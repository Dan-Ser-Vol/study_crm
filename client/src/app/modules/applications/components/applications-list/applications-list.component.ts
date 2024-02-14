import {Component, OnInit} from '@angular/core';
import {ApplicationItemComponent} from '../application-item/application-item.component';
import {IApplication, IFilter, IManager} from '../../../../interfaces';
import {ApplicationsService, AuthService} from '../../../../services';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {columnsDisplay} from '../../utils';
import {Router} from '@angular/router';
import {tap} from 'rxjs';
import {MatChipsModule} from "@angular/material/chips";

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [
    ApplicationItemComponent,
    MatTabsModule,
    MatTableModule,
    MatChipsModule,
  ],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.scss',
})
export class ApplicationsListComponent implements OnInit {
  applications: IApplication[];
  me: IManager;
  appLabels = columnsDisplay;
  sortedBy: string | null;
  sortSymbol: string;
  filters: IFilter;

  constructor(
    private router: Router,
    private appService: ApplicationsService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.appService.getFilterItems().subscribe(value => {
      this.filters = value;
      const queryParams = {...this.filters};
      this.router.navigate([], {queryParams});
    });
    this.authService.getMe().subscribe(value => this.me = value)
    this.appService
      .getApplicationsListSubj()
      .pipe(
        tap(value => {
          if (value && value.data) {
            this.applications = value.data;
          }
        })
      )
      .subscribe();
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
    const queryParams = {...filters};
    queryParams['sortedBy'] = `${this.sortSymbol}${this.sortedBy}`;
    return queryParams;
  }
}

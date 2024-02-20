import { Component, OnInit } from '@angular/core';
import { ApplicationsListComponent } from '../../components/applications-list/applications-list.component';
import {
  ApplicationsService,
  PaginatorIntlService,
} from '../../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { FilterFormComponent } from '../../components/filter-form/filter-form.component';
import { IFilter } from '../../../../interfaces';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-applications-page',
  standalone: true,
  imports: [
    ApplicationsListComponent,
    MatPaginatorModule,
    FilterFormComponent,
    MatTableModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
  templateUrl: './applications-page.component.html',
})
export class ApplicationsPageComponent implements OnInit {
  length: number;
  pageSize: number = 25;
  hidePageSize = false;
  pageSizeOptions = [10, 25, 50, 100];
  showPageSizeOptions = true;
  page: number;
  filters: IFilter;

  constructor(
    private appService: ApplicationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryObj => {
      this.appService.setFilterItems(queryObj);
      const { page, limit } = queryObj;
      this.page = page;
      this.pageSize = limit;
      this.appService.getAll(page, limit).subscribe(appData => {
        this.length = appData.itemsFound;
      });
    });

    this.appService.getFilterItems().subscribe(value => {
      this.filters = value;
      const queryParams = { ...this.filters };
      this.router.navigate([], { queryParams });
    });
  }

  handlePageEvent(event: PageEvent) {
    const queryParams = this.buildQueryParams(this.filters, event);
    this.router.navigate([], { queryParams });
  }

  private buildQueryParams(filters: IFilter, pageEvent: PageEvent): any {
    const queryParams = { ...filters };
    if (pageEvent.pageIndex === 0) {
      queryParams['page'] = pageEvent.pageIndex + 1;
      queryParams['limit'] = pageEvent.pageSize;
    } else {
      queryParams['page'] = pageEvent.pageIndex;
      queryParams['limit'] = pageEvent.pageSize;
    }
    return queryParams;
  }
}

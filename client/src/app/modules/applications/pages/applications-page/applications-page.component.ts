import { Component, OnInit } from '@angular/core';
import { ApplicationsListComponent } from '../../components/applications-list/applications-list.component';
import { IApplication } from '../../../../interfaces';
import { ApplicationsService } from '../../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FilterFormComponent } from '../../components/filter-form/filter-form.component';
import { IFilter } from '../../../../interfaces';

@Component({
  selector: 'app-applications-page',
  standalone: true,
  imports: [ApplicationsListComponent, MatPaginatorModule, FilterFormComponent],
  templateUrl: './applications-page.component.html',
})
export class ApplicationsPageComponent implements OnInit {
  applications: IApplication[];
  length: number;
  pageSize: number = 25;
  hidePageSize = false;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showPageSizeOptions = true;
  pageIndex: number;
  filters: IFilter;
  constructor(
    private appService: ApplicationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryObj => {
      this.appService.getAll().subscribe(value => {
        this.applications = value.data;
        this.length = value.itemsFound;
        this.pageIndex = value.page;

        this.appService.setFilterItems(queryObj);
      });
    });

    this.appService.getFilterItems().subscribe(value => {
      this.filters = value;
      this.appService.getAll().subscribe(value => {
        this.applications = value.data;
        this.length = value.itemsFound;
        this.pageIndex = value.page;
        this.router.navigate([], {
          queryParams: { ...this.filters },
        });
      });
    });
  }

  handlePageEvent(event: PageEvent) {
    this.router.navigate([], {
      queryParams: { page: event.pageIndex + 1, limit: event.pageSize },
    });
  }
}

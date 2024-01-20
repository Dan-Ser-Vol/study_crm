import {Component, OnInit} from '@angular/core';
import { ApplicationsListComponent } from '../../components/applications-list/applications-list.component';
import {IApplication} from "../../../../interfaces";
import {ApplicationsService} from "../../../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {FilterFormComponent} from "../../components/filter-form/filter-form.component";

@Component({
  selector: 'app-applications-page',
  standalone: true,
  imports: [ApplicationsListComponent, MatPaginatorModule, FilterFormComponent,],
  templateUrl: './applications-page.component.html',
  styleUrl: './applications-page.component.scss',
})
export class ApplicationsPageComponent implements OnInit{
  applications: IApplication[];
  length: number;
  pageSize: number = 25;
  hidePageSize = false;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showPageSizeOptions = true;
  pageIndex: number;
  constructor(
    private appService: ApplicationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(({ page, limit }) => {
      this.appService.getAll(page, limit).subscribe(value => {
        this.applications = value.data;
        this.length = value.totalCount;
      });
    });
  }

  handlePageEvent(event: PageEvent) {
    this.router.navigate([], {
      queryParams: { page: event.pageIndex + 1, limit: event.pageSize },
    });
  }
}

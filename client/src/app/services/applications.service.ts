import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IApplication, IFilter, IPagination } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  filterItemsSubj = new BehaviorSubject<IFilter>(null);
  applicationsListSubj = new BehaviorSubject<IPagination<IApplication>>(null);

  constructor(private httpClient: HttpClient) {}

  getAll(page = 1, limit = 25): Observable<IPagination<IApplication>> {
    return this.httpClient
      .get<IPagination<IApplication>>(urls.applications.getAll, {
        params: { page, limit, ...this.filterItemsSubj.value },
      })
      .pipe(tap(value => this.applicationsListSubj.next(value)));
  }

  getFilterItems(): Observable<IFilter> {
    return this.filterItemsSubj.asObservable();
  }
  setFilterItems(filters: IFilter) {
    return this.filterItemsSubj.next(filters);
  }
  setApplicationsListSubj(applications: IPagination<IApplication>) {
    return this.applicationsListSubj.next(applications);
  }

  getApplicationsListSubj(): Observable<IPagination<IApplication>> {
    return this.applicationsListSubj.asObservable();
  }
}

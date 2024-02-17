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
  isLoadSubj = new BehaviorSubject<boolean>(false);
  applicationsListSubj = new BehaviorSubject<IPagination<IApplication>>(null);

  constructor(private httpClient: HttpClient) {}

  getAll(page = 1, limit = 25): Observable<IPagination<IApplication>> {
    return this.httpClient
      .get<IPagination<IApplication>>(urls.applications.getAll, {
        params: { page, limit, ...this.filterItemsSubj.value },
      })
      .pipe(
        tap(value => {
          this.setApplicationsListSubj(value);
          this.isLoadSubj.next(true);
        })
      );
  }

  getById(appId: string): Observable<IApplication> {
    return this.httpClient
      .get<IApplication>(urls.applications.byId(appId))
      .pipe(
        tap(() => {
          this.isLoadSubj.next(true);
        })
      );
  }

  getFilterItems(): Observable<IFilter> {
    return this.filterItemsSubj.asObservable();
  }
  setFilterItems(filters: IFilter) {
    return this.filterItemsSubj.next(filters);
  }

  getIsLoad(): Observable<boolean> {
    return this.isLoadSubj.asObservable();
  }
  setIsLoad() {
    return this.isLoadSubj.next(!this.isLoadSubj.value);
  }
  setApplicationsListSubj(applications: IPagination<IApplication>) {
    return this.applicationsListSubj.next(applications);
  }

  getApplicationsListSubj(): Observable<IPagination<IApplication>> {
    return this.applicationsListSubj.asObservable();
  }
}

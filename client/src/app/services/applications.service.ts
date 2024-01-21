import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApplication, IPagination } from '../interfaces';
import { IFilter } from '../interfaces/filter.interface';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  filterItemsSubj = new BehaviorSubject<IFilter>(null);

  constructor(private httpClient: HttpClient) {}
  getAll(page = 1, limit = 25): Observable<IPagination<IApplication>> {
    return this.httpClient.get<IPagination<IApplication>>(
      urls.applications.getAll,
      { params: { page, limit, ...this.filterItemsSubj.value } }
    );
  }

  getFilterItems() {
    return this.filterItemsSubj.asObservable();
  }
  setFilterItems(filters: IFilter) {
    return this.filterItemsSubj.next(filters);
  }
}

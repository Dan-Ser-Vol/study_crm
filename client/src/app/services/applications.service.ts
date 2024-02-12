import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApplication, IFilter, IPagination } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  filterItemsSubj = new BehaviorSubject<IFilter>(null);
  triggerSubj = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getAll(page = 1, limit = 25): Observable<IPagination<IApplication>> {
    return this.httpClient.get<IPagination<IApplication>>(
      urls.applications.getAll,
      { params: { page, limit, ...this.filterItemsSubj.value } }
    );
  }

  addManager(appId: string): Observable<IApplication> {
    return this.httpClient.post<IApplication>(urls.applications.addManager(), {
      appId,
    });
  }

  getFilterItems() {
    return this.filterItemsSubj.asObservable();
  }
  setFilterItems(filters: IFilter) {
    return this.filterItemsSubj.next(filters);
  }

  getTriggerSubj() {
    return this.triggerSubj.asObservable();
  }
  setTriggerSubj() {
    return this.triggerSubj.next(!this.triggerSubj.value);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApplication, IComment, IPagination } from '../interfaces';
import { IFilter } from '../interfaces';

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

  findCommentsById(ids: string[]): Observable<IComment[]> {
    return this.httpClient.post<IComment[]>(
      urls.applications.getCommentsById(),
      { ids }
    );
  }

  createComment(applicationId: string, message: string): Observable<IComment> {
    return this.httpClient.post<IComment>(
      urls.applications.createComment(applicationId),
      message
    );
  }

  deleteComment(applicationId: string, commentId: string): Observable<any> {
    return this.httpClient.delete(
      urls.applications.deleteComment(applicationId, commentId)
    );
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

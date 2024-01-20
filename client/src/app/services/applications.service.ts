import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { Observable } from 'rxjs';
import { IApplication, IPagination } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(private httpClient: HttpClient) {}

  getAll(page = 1, limit = 25): Observable<IPagination<IApplication>> {
    return this.httpClient.get<IPagination<IApplication>>(
      urls.applications.getAll,
      { params: { page, limit } }
    );
  }
}

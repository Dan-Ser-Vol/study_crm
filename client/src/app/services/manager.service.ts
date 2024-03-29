import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { IManager } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ManagersService {
  currentManagerSubj = new BehaviorSubject<IManager>(null);

  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<IManager> {
    return this.httpClient.get<IManager>(urls.managers.getById(id));
  }

  deleteById(id: string): Observable<IManager> {
    return this.httpClient.delete<IManager>(urls.managers.deleteById(id));
  }

  getCurrentManager() {
    return this.currentManagerSubj.asObservable();
  }
  setCurrentManager(manager: IManager) {
    return this.currentManagerSubj.next(manager);
  }
}

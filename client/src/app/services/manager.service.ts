import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { IManager } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ManagersService {
  triggerSubj = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<IManager> {
    return this.httpClient.get<IManager>(urls.managers.getById(id));
  }

  deleteById(id: string): Observable<IManager> {
    return this.httpClient.delete<IManager>(urls.managers.deleteById(id));
  }

  getTriggerSubj() {
    return this.triggerSubj.asObservable();
  }
  setTriggerSubj() {
    return this.triggerSubj.next(!this.triggerSubj.value);
  }
}

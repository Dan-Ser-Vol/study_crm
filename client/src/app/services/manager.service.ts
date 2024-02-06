import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApplication } from '../interfaces';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ManagersService {
  triggerSubj = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(urls.managers.getById(id));
  }

  createManager(id: string, message: string): Observable<IApplication> {
    return this.httpClient.post<IApplication>(
      urls.applications.createMessage(id),
      message
    );
  }

  deleteById(id: string): Observable<IUser> {
    return this.httpClient.delete<IUser>(urls.managers.deleteById(id));
  }

  getTriggerSubj() {
    return this.triggerSubj.asObservable();
  }
  setTriggerSubj() {
    return this.triggerSubj.next(!this.triggerSubj.value);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IApplication, IComment } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  commentsUpdatedSubj = new BehaviorSubject<IApplication>(null);

  findCommentsById(ids: string[]): Observable<IComment[]> {
    return this.httpClient.post<IComment[]>(urls.comments.getCommentsById(), {
      ids,
    });
  }

  createComment(
    applicationId: string,
    message: string
  ): Observable<IApplication> {
    return this.httpClient
      .post<IApplication>(urls.comments.createComment(applicationId), message)
      .pipe(tap(value => this.setCommentsUpdated(value)));
  }

  deleteComment(applicationId: string, commentId: string): Observable<any> {
    return this.httpClient.delete(
      urls.comments.deleteComment(applicationId, commentId)
    );
  }

  setCommentsUpdated(value: IApplication) {
    return this.commentsUpdatedSubj.next(value);
  }

  getCommentsUpdated(): Observable<IApplication> {
    return this.commentsUpdatedSubj.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { Observable } from 'rxjs';
import { IComment } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  findCommentsById(ids: string[]): Observable<IComment[]> {
    return this.httpClient.post<IComment[]>(urls.comments.getCommentsById(), {
      ids,
    });
  }

  createComment(applicationId: string, message: string): Observable<IComment> {
    return this.httpClient.post<IComment>(
      urls.comments.createComment(applicationId),
      message
    );
  }

  deleteComment(applicationId: string, commentId: string): Observable<any> {
    return this.httpClient.delete(
      urls.comments.deleteComment(applicationId, commentId)
    );
  }
}

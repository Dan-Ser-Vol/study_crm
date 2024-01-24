import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  handleHttpError(error: any): void {
    if (error.status === 400) {
      this.router.navigate(['/login']);
    }
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
    if (error.status === 403) {
      this.router.navigate(['/login']);
    }
    if (error.status === 404) {
      this.router.navigate(['/**']);
    }
    if (error.status === 422) {
      this.router.navigate(['/login']);
    }
    if (error.status === 500) {
      this.router.navigate(['/**']);
    }
    if (error.status === 0) {
      this.router.navigate(['/**'], {
        queryParams: { errorStatus: 'Unknown Error' },
      });
    }
  }
}

export const errorInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};

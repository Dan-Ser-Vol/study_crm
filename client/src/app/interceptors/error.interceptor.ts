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
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    protected toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse): Observable<HttpEvent<any>> => {
        this.handleHttpError(err);
        return throwError(err);
      })
    );
  }

  handleHttpError(err: any): void {
    if (err.status === 400) {
      this.toastr.error(err.error.message);
    }
    if (err.status === 401) {
      this.router.navigate(['/login']);
    }
    if (err.status === 403) {
      this.toastr.error(err.error.message);
    }
    if (err.status === 404) {
      this.router.navigate(['/**']);
    }
    if (err.status === 422) {
      this.toastr.error(err.error.message);
    }
    if (err.status === 500) {
      this.router.navigate(['/**']);
    }
    if (err.status === 0) {
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

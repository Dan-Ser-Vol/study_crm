import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import { urls } from '../constants';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {
  isRefreshing = false;
  waitRefreshSubj = new BehaviorSubject<string>(null);

  constructor(
    private authService: AuthService,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      req = this.addToken(req, accessToken);
    }
    return next.handle(req).pipe(
      catchError((res: HttpErrorResponse) => {
        if (res && res.error && res.status === 401) {
          const refreshToken = this.authService.getRefreshToken();
          if (!this.isRefreshing && refreshToken) {
            return this.handle401Error(req, next, refreshToken);
          }
          if (res.url === urls.auth.refresh) {
            this.isRefreshing = false;
            this.authService.deleteTokens();
            this.matDialog.closeAll();
            this.router.navigate(['auth', 'login'], {
              queryParams: {
                sessionExpired: true,
              },
            });
            return throwError(() => res);
          }

          return this.waitRefreshSubj.pipe(
            filter(token => token === null),
            take(1),
            switchMap(token => {
              return next.handle(this.addToken(req, token));
            })
          );
        }
        return throwError(() => res);
      })
    ) as any;
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    refreshToken: string
  ): any {
    this.isRefreshing = true;
    return this.authService.refresh(refreshToken).pipe(
      switchMap(tokens => {
        this.isRefreshing = false;
        this.waitRefreshSubj.next(tokens.accessToken);
        return next.handle(this.addToken(req, tokens.accessToken));
      })
    );
  }
}

export const loggerInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoggerInterceptor,
  multi: true,
};

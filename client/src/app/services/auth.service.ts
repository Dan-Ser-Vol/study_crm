import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IUserAuth, IUserAuthRes } from '../interfaces';
import { urls } from '../constants/urls';
import { catchError } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthSig = signal<boolean>(false);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly toastrService: ToastrService
  ) {
    const token = localStorage.getItem('token');
    this.isAuthSig.set(!!token);
  }

  signup(userData: IUserAuth) {
    return this.httpClient
      .post(urls.auth.register, userData)
      .pipe(
        tap(() => {
          this.login(userData);
        }),
        catchError((err) => {
          this.handeError(err);
          throw new Error(err.message);
        })
      )
      .subscribe(() =>
        this.toastrService.success('The user has been successfully registered')
      );
  }

  login(userData: IUserAuth) {
    return this.httpClient
      .post<IUserAuthRes>(urls.auth.login, userData)
      .pipe(
        tap((res: IUserAuthRes) => {
          localStorage.setItem('token', res.token);
          this.isAuthSig.set(true);
        }),
        catchError((err) => {
          this.handeError(err);
          throw new Error(err.message);
        })
      )
      .subscribe(() => {
        this.toastrService.success('User is successfully authorized');
        void this.router.navigate(['/home']);
      });
  }

  logout() {
    return this.httpClient
      .post(urls.auth.logout, {})
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          this.isAuthSig.set(false);
          void this.router.navigate(['/login']);
          this.toastrService.success('You have successfully logged out');
        }),
        catchError((err) => {
          this.handeError(err);
          if(err.status === 401) {
            void this.router.navigate(['/login']);
          }
          throw new Error(err.message);
        })
      )
      .subscribe();
  }

  private handeError(err: HttpErrorResponse) {
    console.log('console',err.error.message);
    this.toastrService.error(err.error.message);
  }
}

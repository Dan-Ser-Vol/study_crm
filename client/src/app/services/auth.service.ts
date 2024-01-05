import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { urls } from '../constants';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuth, ITokens } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _accessTokenKey: string = 'access';
  private readonly _refreshTokenKey: string = 'refresh';
  private authUserSubject: BehaviorSubject<IAuth> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {}

  // signup(userData: IAuth) {
  //   return this.httpClient
  //     .post(urls.auth.register, userData)
  //     .pipe(
  //       tap(() => {
  //         this.login(userData);
  //       }),
  //       catchError(err => {
  //         this.handeError(err);
  //         throw new Error(err.message);
  //       })
  //     )
  //     .subscribe(() =>
  //       this.toastrService.success('The user has been successfully registered')
  //     );
  // }

  login(userData: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.login, userData).pipe(
      tap(tokens => {
        this._setTokens(tokens);
        this.me().subscribe(user => {
          this.setAuthUser(user);
        });
      })
    );
  }

  me(): Observable<IAuth> {
    return this.httpClient.get<IAuth>(urls.auth.me);
  }

  refresh(refresh: string): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.refresh, { refresh }).pipe(
      tap(tokens => {
        this._setTokens(tokens);
      })
    );
  }

  // logout() {
  //   return this.httpClient.post(urls.auth.logout, {}).pipe(
  //     tap(() => {
  //       this.deleteTokens();
  //       void this.router.navigate(['/login']);
  //       this.toastrService.success('You have successfully logged out');
  //     }),
  //     catchError(err => {
  //       this.handeError(err);
  //       if (err.status === 401) {
  //         void this.router.navigate(['/login']);
  //       }
  //       throw new Error(err.message);
  //     })
  //   );
  // }

  private _setTokens({ access, refresh }: ITokens): void {
    localStorage.setItem(this._accessTokenKey, access);
    localStorage.setItem(this._refreshTokenKey, refresh);
  }
  getAccessToken(): string {
    return localStorage.getItem(this._accessTokenKey) || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this._refreshTokenKey) || '';
  }
  deleteTokens() {
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
  }

  getAuthUser(): Observable<IAuth> {
    return this.authUserSubject.asObservable();
  }

  setAuthUser(user: IAuth) {
    this.authUserSubject.next(user);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuth, ITokens } from '../interfaces';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _accessTokenKey: string = 'accessToken';
  private readonly _refreshTokenKey: string = 'refreshToken';
  isAuthSubj = new BehaviorSubject<boolean>(false);
  trigger = new BehaviorSubject<boolean>(false);
  meSubj = new BehaviorSubject<IUser>(null);

  constructor(private httpClient: HttpClient) {
    this.isAuthSubj.next(!!this.getAccessToken());
  }

  login(userData: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.login, userData).pipe(
      tap(tokens => {
        this._setTokens(tokens);
        this.isAuthSubj.next(true);
      })
    );
  }

  me(): Observable<IUser> {
    return this.httpClient
      .get<IUser>(urls.auth.me)
      .pipe(tap(value => this.meSubj.next(value)));
  }

  refresh(refreshToken: string): Observable<ITokens> {
    console.log(refreshToken, 'service');
    return this.httpClient
      .post<ITokens>(urls.auth.refresh, { refreshToken })
      .pipe(
        tap(tokens => {
          console.log('In service', tokens);
          this._setTokens(tokens);
        })
      );
  }

  private _setTokens({ accessToken, refreshToken }: ITokens): void {
    localStorage.setItem(this._accessTokenKey, accessToken);
    localStorage.setItem(this._refreshTokenKey, refreshToken);
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

  getIsAuth() {
    return this.isAuthSubj.asObservable();
  }

  getMe() {
    return this.meSubj.asObservable();
  }

  getTrigger() {
    return this.trigger.asObservable();
  }

  setTrigger() {
    return this.trigger.next(!this.trigger);
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
}

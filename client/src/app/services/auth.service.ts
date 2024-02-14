import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from '../constants';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { IAuth, IManager, ITokens } from '../interfaces';
import { Router } from '@angular/router';
import { ManagersService } from './manager.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _accessTokenKey: string = 'accessToken';
  private readonly _refreshTokenKey: string = 'refreshToken';
  isAuthSubj = new BehaviorSubject<boolean>(false);
  trigger = new BehaviorSubject<boolean>(false);
  meSubj = new BehaviorSubject<IManager>(null);
  accessTokenSubj = new BehaviorSubject<string>(null);

  constructor(
    private httpClient: HttpClient,
    private managersService: ManagersService,
    private router: Router
  ) {
    this.isAuthSubj.next(!!this.getAccessToken());
    this.accessTokenSubj.next(this.getRefreshToken());

    if (this.accessTokenSubj.value !== this.getAccessToken()) {
      this.isAuthSubj.next(false);
    }
  }

  login(userData: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.login, userData).pipe(
      tap(tokens => {
        this._setTokens(tokens);
        this.accessTokenSubj.next(tokens.accessToken);
        this.isAuthSubj.next(true);
      })
    );
  }

  me(): Observable<IManager> {
    return this.httpClient.get<IManager>(urls.auth.me).pipe(
      tap(value => {
        this.meSubj.next(value);
        this.managersService.setCurrentManager(value);
      })
    );
  }

  refresh(refreshToken: string): Observable<ITokens> {
    return this.httpClient
      .post<ITokens>(urls.auth.refresh, { refreshToken })
      .pipe(
        tap(tokens => {
          this._setTokens(tokens);
        })
      );
  }

  logout() {
    return this.httpClient.post(urls.auth.logout, {}).pipe(
      tap(() => {
        this.deleteTokens();
        this.isAuthSubj.next(false);
        void this.router.navigate(['/login']);
      }),
      catchError(err => {
        if (err.status === 401) {
          void this.router.navigate(['/login']);
        }
        throw new Error(err.message);
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

  setIsAuth() {
    return this.isAuthSubj.next(!this.isAuthSubj);
  }

  getMe() {
    return this.meSubj.asObservable();
  }

  getTrigger() {
    return this.trigger.asObservable();
  }

  changeTrigger() {
    return this.trigger.next(!this.trigger);
  }

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

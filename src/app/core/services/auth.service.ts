import { Crypto } from './../helpers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../models';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient, private crypto: Crypto) {
    this.currentUserSubject = new BehaviorSubject<User>(this.getAuthToken());
    this.currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${BASE_URL}/auth/signin`,
      { usernameOrEmail: username, password: password })
      .pipe(
        map(response => {
          if (response.success) {
            const user = response.data.user;
            user.accessToken = response.data.accessToken;

            if (user && user.accessToken) {
              this.setAuthToken(user);
              this.currentUserSubject.next(user);
            }

            return true;
          }

          return false;
        }));
  }

  public logout(): void {
    this.removeAuthToken();
    this.currentUserSubject.next(null);
  }

  public isAuthenticated(): boolean {
    return (this.currentUserValue && this.tokenNotExpired(this.currentUserValue.accessToken));
  }

  private tokenNotExpired(token: string): boolean {
    const jwtHelper = new JwtHelperService();
    return (token && !jwtHelper.isTokenExpired(token));
  }

  private setAuthToken(token): void {
    localStorage.setItem('auth_token', this.crypto.encryptData(token));
  }

  private removeAuthToken(): void {
    localStorage.removeItem('auth_token');
  }

  private getAuthToken(): User {
    const authToken = localStorage.getItem('auth_token');
    if (!authToken)
      return null;

    return this.crypto.decryptData(authToken);
  }




}
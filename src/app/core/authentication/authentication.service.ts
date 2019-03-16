import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //  this.userService.getAll().pipe(first()).subscribe(users => {
  //    this.users = users;
  //  });
  constructor(private httpClient: HttpClient, private router: Router) { }

  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/authenticate`,
      { username, password })
      .pipe(
        map((user: any) => {
          if (user && user.access_token) {
            this.setToken(JSON.stringify(user));
          }

          return user;
        }));
  }

  public logout(): void {
    this.removeToken();
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();

    return this.tokenNotExpired(token);
  }

  public tokenNotExpired(token: string): boolean {
    // if (token) {
    //   let jwtHelper = new JwtHelperService();
    //   return token != null && !jwtHelper.isTokenExpired(token);
    // } else {
    //   return false;
    // }
    return true;
  }

  public getToken(): string {
    return localStorage.getItem("jwtToken");
  }

  public setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  public removeToken(): void {
    localStorage.removeItem('jwtToken');
  }
}

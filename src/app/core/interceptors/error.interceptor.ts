import { MatSnackBar } from '@angular/material';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          this.authService.logout();
          // location.reload(true);
        }

        const error = err.error.message || err.statusText;
        console.error(error);

        return throwError({ error: error });
      }));
  }
}
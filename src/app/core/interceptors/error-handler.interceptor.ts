import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    public authService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          let data = {};
          data = {
            reason: error && error.error.reason ? error.error.reason : '',
            status: error.status
          };
          console.error(data);
          // this.errorDialogService.openDialog(data);
          return throwError(error);
        }
      }));
    //   map((event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       // do stuff with response if you want
    //     }
    //     return event;
    //   }, (error: any) => {
    //     if (error instanceof HttpErrorResponse) {
    //       let data = {};
    //       data = {
    //         reason: error && error.error.reason ? error.error.reason : '',
    //         status: error.status
    //       };
    //       console.error(data);
    //       // this.errorDialogService.openDialog(data);
    //       return throwError(error);
    //     }
    //   }));
    // }
  }
}
import { AuthenticationService } from '../authentication/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let requestOption: any = {};

    if (this.authService.getToken()) {
      requestOption.setHeaders = {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    }

    request = request.clone(requestOption);
    return next.handle(request)
  }
}
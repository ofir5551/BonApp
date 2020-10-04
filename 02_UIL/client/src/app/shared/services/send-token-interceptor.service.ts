import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';

import { AuthService } from './auth.service';

// This interceptor is a service that intercepts
// all outgoing HTTP requests that require authentication,
// and attaches the token to the headers
@Injectable()
export class SendTokenInterceptor implements HttpInterceptor {
  readonly rootUrl = 'http://localhost:3000';

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      req.url == `${this.rootUrl}/users` ||
      req.url == `${this.rootUrl}/users/login`
    )
      return next.handle(req);

    const authReq = req.clone({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.token}`
      ),
    });

    return next.handle(authReq);
  }
}

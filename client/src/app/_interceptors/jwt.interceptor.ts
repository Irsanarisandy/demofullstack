import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';

import { User } from '../_domain/user';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let curUser: User;
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => curUser = user);
    if (curUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${curUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}

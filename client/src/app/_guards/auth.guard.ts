import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { User } from '../_domain/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user: User) => {
        if (user) {
          return true;
        }
        this.openSnackBar('You shall not pass!', 'Error');
      })
    );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3500
    });
  }
}

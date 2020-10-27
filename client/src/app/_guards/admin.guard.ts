import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user.roles.includes('Admin') || user.roles.includes('Moderator')) {
          return true;
        }
        this.openSnackBar(`You can't enter this area!`, 'Unauthorized');
      })
    );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3500
    });
  }
}

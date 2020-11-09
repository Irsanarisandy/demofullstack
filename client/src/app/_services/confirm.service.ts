import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor(private dialog: MatDialog) { }

  confirm(
    title = 'Confirmation',
    message = 'Are you sure you want to do this?',
    btnOkText = 'Ok',
    btnCancelText = 'Cancel'
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: 'auto',
      width: '320px',
      data: {
        title,
        message,
        btnOkText,
        btnCancelText
      }
    });

    return new Observable<boolean>(this.getResult(dialogRef));
  }

  private getResult(dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>): (observer: any) => { unsubscribe(): void } {
    return (observer) => {
      const subscription = dialogRef.afterClosed().subscribe(result => {
        observer.next(result);
        observer.complete();
      });

      return {
        unsubscribe(): void {
          subscription.unsubscribe();
        }
      };
    };
  }
}

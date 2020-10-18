import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from '../../../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() closeRegister = new EventEmitter();
  public model = {
    username: '',
    password: ''
  };

  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) { }

  register(): void {
    this.accountService.register(this.model).subscribe(
      response => {
        this.closeRegister.emit(false);
      },
      error => {
        console.log(error);
        switch (typeof(error.error)) {
          case 'object':
            this.openSnackBar(error.error.title, 'Error');
            break;
          default:
            this.openSnackBar(error.error, 'Error');
        }
      }
    );
  }

  cancel(): void {
    this.closeRegister.emit(false);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3500
    });
  }
}

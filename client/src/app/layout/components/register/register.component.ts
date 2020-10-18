import { Component, EventEmitter, Output } from '@angular/core';

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

  constructor(private accountService: AccountService) { }

  register(): void {
    this.accountService.register(this.model).subscribe(
      response => {
        this.closeRegister.emit(false);
      },
      error => console.log(error)
    );
  }

  cancel(): void {
    this.closeRegister.emit(false);
  }
}

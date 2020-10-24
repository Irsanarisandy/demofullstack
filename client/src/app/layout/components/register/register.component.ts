import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../../../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() closeRegister = new EventEmitter();
  public registerForm: FormGroup;
  public validationErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      gender: ['male'],
      dateOfBirth: ['', [Validators.required, this.validDateOfBirth()]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmedPassword: ['', [Validators.required, this.matchValues('password')]]
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) =>
      control?.value === control?.parent?.controls[matchTo]?.value
        ? null : { isMatch: true };
  }

  validDateOfBirth(): ValidatorFn {
    return (control: AbstractControl) => {
      const minYear = (new Date(control?.value)).getFullYear() >= (new Date()).getFullYear() - 80;
      const maxYear = (new Date(control?.value)).getFullYear() <= (new Date()).getFullYear() - 18;
      return control && minYear && maxYear ? null : { validDateOfBirth: true };
    };
  }

  register(): void {
    this.accountService.register(this.registerForm.value).subscribe(
      response => this.router.navigateByUrl('/members'),
      errors => this.validationErrors = errors
    );
  }

  cancel(): void {
    this.closeRegister.emit(false);
  }
}

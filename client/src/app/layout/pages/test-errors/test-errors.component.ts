import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent implements OnInit {
  private baseURL = environment.apiUrl;
  public validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  get400Error(): void {
    this.http.get(`${this.baseURL}/buggy/bad-request`).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  get400ValidationError(): void {
    this.http.post(`${this.baseURL}/account/register`, {}).subscribe(
      response => console.log(response),
      errors => {
        console.log(errors);
        this.validationErrors = errors;
      }
    );
  }

  get401Error(): void {
    this.http.get(`${this.baseURL}/buggy/auth`).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  get404Error(): void {
    this.http.get(`${this.baseURL}/buggy/not-found`).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  get500Error(): void {
    this.http.get(`${this.baseURL}/buggy/server-error`).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}

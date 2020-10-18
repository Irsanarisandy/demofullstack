import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public users: any;

  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.http.get('https://localhost:5001/api/users').subscribe(
      response => {
        this.users = response;
      }, error => {
        console.error(error);
      }
    );
  }
}

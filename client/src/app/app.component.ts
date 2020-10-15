import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'The Dating App';
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

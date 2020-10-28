import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_domain/user';
import { environment } from '../../environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseURL = environment.apiUrl;

  // to enable current user to be kept when browser has been refreshed
  private currentUserSource = new ReplaySubject<User>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private presenceService: PresenceService
  ) { }

  login(model: any): Observable<any> {
    return this.http.post(`${this.baseURL}/account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          this.presenceService.createHubConnection(user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presenceService.stopHubConnection();
  }

  register(model: any): Observable<any> {
    return this.http.post(`${this.baseURL}/account/register`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          this.presenceService.createHubConnection(user);
        }
      })
    );
  }

  setCurrentUser(user: User): void {
    if (user) {
      user.roles = [];
      const role = this.getDecodedToken(user.token).role;
      Array.isArray(role) ? user.roles = role : user.roles.push(role);
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
    }
  }

  getDecodedToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
}

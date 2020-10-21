import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Member } from '../_domain/member';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseURL}/users`);
  }

  getMember(username: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseURL}/users/${username}`);
  }
}

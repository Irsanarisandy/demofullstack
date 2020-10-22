import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Member } from '../_domain/member';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private baseURL = environment.apiUrl;
  public members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    if (this.members.length > 0) {
      return of(this.members);
    }
    return this.http.get<Member[]>(`${this.baseURL}/users`).pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find(x => x.username === username);
    if (member) {
      return of(member);
    }
    return this.http.get<Member>(`${this.baseURL}/users/${username}`);
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(`${this.baseURL}/users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/users/set-main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/users/delete-photo/${photoId}`);
  }
}

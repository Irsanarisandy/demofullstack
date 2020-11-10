import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../environments/environment';
import { Photo } from '../_domain/photo';
import { User } from '../_domain/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles(): Observable<Partial<User[]>> {
    return this.http.get<Partial<User[]>>(`${this.baseURL}/admin/users-with-roles`);
  }

  updateUserRoles(username: string, roles: string[]): Observable<any> {
    return this.http.post(`${this.baseURL}/admin/edit-roles/${username}?roles=${roles}`, {});
  }

  getPhotosForApproval(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseURL}/admin/photos-to-moderate`);
  }

  approvePhoto(photoId: number): Observable<any> {
    return this.http.post(`${this.baseURL}/admin/approve-photo/${photoId}`, {});
  }

  rejectPhoto(photoId: number): Observable<any> {
    return this.http.post(`${this.baseURL}/admin/reject-photo/${photoId}`, {});
  }
}

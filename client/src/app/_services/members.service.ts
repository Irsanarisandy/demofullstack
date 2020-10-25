import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Member } from '../_domain/member';
import { PaginatedResult } from '../_domain/pagination';
import { User } from '../_domain/user';
import { UserParams } from '../_domain/user-params';
import { LikesParams } from '../_domain/likes-params';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private baseURL = environment.apiUrl;
  public members: Member[] = [];
  private memberCache = new Map();
  private user: User;
  private userParams: UserParams;
  private likesParams: LikesParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
      this.likesParams = new LikesParams();
    });
  }

  getUserParams(): UserParams {
    return this.userParams;
  }

  setUserParams(params: UserParams): void {
    this.userParams = params;
  }

  resetUserParams(): UserParams {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>> {
    const cachedResponse = this.memberCache.get(Object.values(userParams).join('-'));
    if (cachedResponse) {
      return of(cachedResponse);
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(`${this.baseURL}/users`, params).pipe(
      map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string): Observable<Member> {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((curMember: Member) => curMember.username === username);
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

  getLikesParams(): LikesParams {
    return this.likesParams;
  }

  setLikesParams(params: LikesParams): void {
    this.likesParams = params;
  }

  toggleLike(username: string): Observable<any> {
    return this.http.post(`${this.baseURL}/likes/${username}`, {});
  }

  getLikes(likesParams: LikesParams): Observable<PaginatedResult<Partial<Member[]>>> {
    let params = this.getPaginationHeaders(likesParams.pageNumber, likesParams.pageSize);

    params = params.append('predicate', likesParams.predicate);

    return this.getPaginatedResult<Partial<Member[]>>(`${this.baseURL}/likes`, params);
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }

  private getPaginatedResult<T>(url: string, params: HttpParams): Observable<PaginatedResult<T>> {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination')) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }
}

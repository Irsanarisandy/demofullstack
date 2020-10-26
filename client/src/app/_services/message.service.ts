import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Message } from '../_domain/message';
import { MessageParams } from '../_domain/message-params';
import { PaginatedResult } from '../_domain/pagination';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseURL = environment.apiUrl;
  private messageParams: MessageParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.messageParams = new MessageParams();
    });
  }

  getMessageParams(): MessageParams {
    return this.messageParams;
  }

  setMessageParams(params: MessageParams): void {
    this.messageParams = params;
  }

  getMessages(messageParams: MessageParams): Observable<PaginatedResult<Message[]>> {
    let params = getPaginationHeaders(messageParams.pageNumber, messageParams.pageSize);

    params = params.append('Container', messageParams.container);

    return getPaginatedResult<Message[]>(`${this.baseURL}/messages`, params, this.http);
  }

  getMessageThread(username: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseURL}/messages/thread/${username}`);
  }

  sendMessage(username: string, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.baseURL}/messages`, {
      recipientUsername: username,
      content
    });
  }

  deleteMessage(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/messages/${id}`);
  }
}

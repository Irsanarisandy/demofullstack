import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Group } from '../_domain/group';
import { Message } from '../_domain/message';
import { MessageParams } from '../_domain/message-params';
import { PaginatedResult } from '../_domain/pagination';
import { User } from '../_domain/user';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseURL = environment.apiUrl;
  private hubURL = environment.hubUrl;
  private hubConnection: HubConnection;
  private messageParams: MessageParams;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  public messageThread$ = this.messageThreadSource.asObservable();

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.messageParams = new MessageParams();
    });
  }

  createHubConnection(user: User, otherUsername: string): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubURL}/message?user=${otherUsername}`, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('ReceiveMessageThread', (messages: Message[]) => this.messageThreadSource.next(messages));
    this.hubConnection.on('NewMessage', (message: Message) => {
      this.messageThreadSource.pipe(take(1)).subscribe(messages => this.messageThreadSource.next([...messages, message]));
    });
    this.hubConnection.on('UpdateGroup', (group: Group) => {
      if (group.connections.some(x => x.username === otherUsername)) {
        this.messageThread$.pipe(take(1)).subscribe(messages => {
          messages.forEach(message => {
            if (!message.dateRead) {
              message.dateRead = new Date(Date.now());
            }
          });
          this.messageThreadSource.next([...messages]);
        });
      }
    });
  }

  stopHubConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().catch(error => console.log(error));
    }
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

  async sendMessage(username: string, content: string): Promise<any> {
    return this.hubConnection.invoke('SendMessage', {
      recipientUsername: username,
      content
    })
    .catch(error => console.log(error));
  }

  deleteMessage(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/messages/${id}`);
  }
}

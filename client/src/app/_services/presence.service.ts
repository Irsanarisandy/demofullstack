import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_domain/user';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  public onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  createHubConnection(user: User): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}/presence`, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', (username: string) =>
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => this.onlineUsersSource.next([...usernames, username]))
    );
    this.hubConnection.on('UserIsOffline', (username: string) =>
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => this.onlineUsersSource.next([...usernames.filter(x => x !== username)]))
    );
    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
    });
    this.hubConnection.on('NewMessageReceived', ({username, knownAs}) =>
      this.openSnackBar(`${knownAs} has sent you a new message!`, 'Notification', username)
    );
  }

  stopHubConnection(): void {
    this.hubConnection.stop().catch(error => console.log(error));
  }

  openSnackBar(message: string, action: string, username?: string): void {
    const snack = this.snackBar.open(message, action, {
      duration: 5000
    });
    if (username) {
      snack.onAction().subscribe(() => this.router.navigateByUrl(`/members/${username}?tab=3`));
    }
  }
}

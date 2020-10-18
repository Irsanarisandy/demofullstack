import { Injectable, OnDestroy } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService implements OnDestroy {
  private mediaSubscription: Subscription;
  public isMobile: boolean;

  constructor(private mediaObserver: MediaObserver) {
    this.mediaSubscription = this.mediaObserver.asObservable().subscribe(() => this.checkDevice());
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }

  checkDevice(): void {
    this.isMobile = this.mediaObserver.isActive('lt-md');
  }
}

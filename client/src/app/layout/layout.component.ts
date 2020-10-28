import { Component, OnInit } from '@angular/core';

import { NavMenuItems } from '../_domain/nav-menu';
import { User } from '../_domain/user';
import { AccountService } from '../_services/account.service';
import { PresenceService } from '../_services/presence.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public navMenuItems = NavMenuItems;

  constructor(
    public accountService: AccountService,
    private presenceService: PresenceService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presenceService.createHubConnection(user);
    }
  }
}

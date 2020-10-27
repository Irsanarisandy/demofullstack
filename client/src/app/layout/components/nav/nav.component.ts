import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AdminMenuItems, NavMenuItems } from '../../../_domain/nav-menu';
import { AccountService } from '../../../_services/account.service';
import { UserSessionService } from '../../../_services/user-session.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {
  @Input() public sideNav: MatSidenav;
  public navMenuItems = NavMenuItems;
  public model = {
    username: '',
    password: ''
  };
  public adminMenuItems = AdminMenuItems;

  constructor(
    public accountService: AccountService,
    public userSession: UserSessionService
  ) { }

  login(): void {
    this.accountService.login(this.model).subscribe(response => location.assign('/members'));
    this.model.password = '';
  }

  logout(): void {
    this.accountService.logout();
    this.model.username = '';
    location.assign('/');
  }
}

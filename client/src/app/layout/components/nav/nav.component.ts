import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { ErrorMenuItems, NavMenuItems } from '../../../_domain/nav-menu';
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
  public errorMenuItems = ErrorMenuItems;

  constructor(
    private router: Router,
    public accountService: AccountService,
    public userSession: UserSessionService
  ) { }

  login(): void {
    this.accountService.login(this.model).subscribe(response =>
      this.router.navigateByUrl('/members')
    );
    this.model.password = '';
  }

  logout(): void {
    this.accountService.logout();
    this.model.username = '';
    this.router.navigateByUrl('/');
  }
}

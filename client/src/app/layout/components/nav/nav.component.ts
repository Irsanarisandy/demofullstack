import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { NavMenuItems } from '../../../_domain/nav-menu';
import { AccountService } from '../../../_services/account.service';
import { UserSessionService } from '../../../_services/user-session.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  @Input() public sideNav: MatSidenav;
  public navMenuItems = NavMenuItems;
  public model = {
    username: '',
    password: ''
  };

  constructor(
    public accountService: AccountService,
    public userSession: UserSessionService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login(): void {
    this.accountService.login(this.model).subscribe(
      response => {},
      error => console.log(error)
    );
    this.model.password = '';
  }

  logout(): void {
    this.accountService.logout();
    this.model.username = '';
  }

  getCurrentUser(): void {
    this.accountService.currentUser$.subscribe(user => {
      if (user) {
        this.model.username = user.username;
      }
    }, error => {
      console.log(error);
    });
  }
}

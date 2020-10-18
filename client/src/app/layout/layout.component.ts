import { Component, OnInit } from '@angular/core';

import { NavMenuItems } from '../_domain/nav-menu';
import { User } from '../_domain/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public navMenuItems = NavMenuItems;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { UserSessionService } from '../../../_services/user-session.service';
import { NavMenuItems } from '../../../_domain/nav-menu';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {
  @Input() public sideNav: MatSidenav;
  public navMenuItems = NavMenuItems;

  constructor(public userSession: UserSessionService) { }
}

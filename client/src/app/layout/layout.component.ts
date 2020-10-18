import { Component, OnInit } from '@angular/core';

import { NavMenuItems } from '../_domain/nav-menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public navMenuItems = NavMenuItems;

  constructor() {}

  ngOnInit(): void {}
}

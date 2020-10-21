import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Member } from '../../../_domain/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberCardComponent {
  @Input() public member: Member;

  constructor() { }
}

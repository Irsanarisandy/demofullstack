import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Member } from '../../../_domain/member';
import { MembersService } from '../../../_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  public members$: Observable<Member[]>;

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.members$ = this.membersService.getMembers();
  }
}

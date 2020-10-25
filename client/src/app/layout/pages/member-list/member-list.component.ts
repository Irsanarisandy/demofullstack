import { Component, OnInit } from '@angular/core';

import { Member } from '../../../_domain/member';
import { Pagination } from '../../../_domain/pagination';
import { UserParams } from '../../../_domain/user-params';
import { MembersService } from '../../../_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  public members: Member[];
  public pagination: Pagination;
  public userParams: UserParams;
  public genderList = [
    { display: 'Males', value: 'male' },
    { display: 'Females', value: 'female' }
  ];

  constructor(private membersService: MembersService) {
    this.userParams = this.membersService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.membersService.setUserParams(this.userParams);
    this.membersService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters(): void {
    this.userParams = this.membersService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any): void {
    this.userParams.pageNumber = event.pageIndex + 1;
    this.membersService.setUserParams(this.userParams);
    this.loadMembers();
  }
}

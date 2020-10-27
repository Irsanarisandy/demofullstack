import { Component, OnInit } from '@angular/core';

import { LikesParams } from '../../../_domain/likes-params';
import { Member } from '../../../_domain/member';
import { Pagination } from '../../../_domain/pagination';
import { MembersService } from '../../../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  public members: Partial<Member[]> = [];
  public likesParams: LikesParams;
  public pagination: Pagination;

  constructor(private membersService: MembersService) {
    this.likesParams = this.membersService.getLikesParams();
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(): void {
    this.membersService.setLikesParams(this.likesParams);
    this.membersService.getLikes(this.likesParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any): void {
    this.likesParams.pageNumber = event.pageIndex + 1;
    this.membersService.setLikesParams(this.likesParams);
    this.loadLikes();
  }
}

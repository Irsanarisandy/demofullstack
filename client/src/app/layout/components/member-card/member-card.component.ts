import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Member } from '../../../_domain/member';
import { MembersService } from '../../../_services/members.service';
import { PresenceService } from '../../../_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberCardComponent {
  @Input() public member: Member;

  constructor(
    private snackBar: MatSnackBar,
    private membersService: MembersService,
    public presenceService: PresenceService
  ) { }

  toggleLike(member: Member): void {
    this.membersService.toggleLike(member.username).subscribe((isLiked: boolean) => {
      this.openSnackBar(`You have ${isLiked ? 'liked' : 'unliked'} ${member.knownAs}`, 'Success');
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3500
    });
  }
}

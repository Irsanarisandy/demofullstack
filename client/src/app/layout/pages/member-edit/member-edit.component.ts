import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';

import { Member } from '../../../_domain/member';
import { User } from '../../../_domain/user';
import { AccountService } from '../../../_services/account.service';
import { MembersService } from '../../../_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editAboutForm') editAboutForm: NgForm;
  public member: Member;
  public user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any): void {
    if (this.editAboutForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private membersService: MembersService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    this.membersService.getMember(this.user.username).subscribe(member => this.member = member);
  }

  updateMember(): void {
    this.membersService.updateMember(this.member).subscribe(() => {
      this.openSnackBar('Profile update successfully', 'Success');
      this.editAboutForm.reset(this.member);
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3500
    });
  }
}

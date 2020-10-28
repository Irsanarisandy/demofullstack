import { AfterContentChecked, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { take } from 'rxjs/operators';

import { Member } from '../../../_domain/member';
import { User } from '../../../_domain/user';
import { AccountService } from '../../../_services/account.service';
import { MembersService } from '../../../_services/members.service';
import { MessageService } from '../../../_services/message.service';
import { PresenceService } from '../../../_services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberDetailComponent implements OnInit, AfterContentChecked, OnDestroy {
  @ViewChild('memberTabGroup') private memberTabGroup: MatTabGroup;
  public member: Member;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];
  public fromRouteQuery = false;
  private user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private membersService: MembersService,
    private messageService: MessageService,
    public presenceService: PresenceService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.member = data.member);

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  ngAfterContentChecked(): void {
    this.route.queryParams.subscribe(params => {
      if (params.tab && this.memberTabGroup && !this.fromRouteQuery) {
        this.selectTab(params.tab);
        this.fromRouteQuery = true;  // to prevent looping here, since we can't reset queryParams
      }
    });
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  toggleLike(member: Member): void {
    this.membersService.toggleLike(member.username).subscribe((isLiked: boolean) => {
      this.openSnackBar(`You have ${isLiked ? 'liked' : 'unliked'} ${member.knownAs}`, 'Success');
    });
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      });
    }
    return imageUrls;
  }

  onTabActivated(event: any): void {
    if (event.index === 3) {
      this.messageService.createHubConnection(this.user, this.member.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  selectTab(selectedIndex: number): void {
    this.memberTabGroup.selectedIndex = selectedIndex;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3500
    });
  }
}

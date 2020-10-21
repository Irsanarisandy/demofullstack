import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

import { Member } from '../../../_domain/member';
import { MembersService } from '../../../_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberDetailComponent implements OnInit {
  public member: Member;
  public galleryOptions: NgxGalleryOptions [];
  public galleryImages: NgxGalleryImage [];

  constructor(
    private route: ActivatedRoute,
    private membersService: MembersService
  ) { }

  ngOnInit(): void {
    this.loadMember();

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
  }

  loadMember(): void {
    this.membersService.getMember(
      this.route.snapshot.paramMap.get('username')
    ).subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
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
}

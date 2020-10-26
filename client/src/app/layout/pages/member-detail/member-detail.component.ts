import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

import { Member } from '../../../_domain/member';
import { Message } from '../../../_domain/message';
import { MessageService } from '../../../_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberDetailComponent implements OnInit, AfterContentChecked {
  @ViewChild('memberTabGroup') private memberTabGroup: MatTabGroup;
  public member: Member;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];
  public messages: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

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
      if (params.tab && this.memberTabGroup) {
        this.selectTab(params.tab);
      }
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

  loadMessages(): void {
    this.messageService.getMessageThread(this.member.username).subscribe(messages => this.messages = messages);
  }

  onTabActivated(event: any): void {
    if (event.index === 3 && this.messages.length === 0) {
      this.loadMessages();
    }
  }

  selectTab(selectedIndex: number): void {
    this.memberTabGroup.selectedIndex = selectedIndex;
  }
}

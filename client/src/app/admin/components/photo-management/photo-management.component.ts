import { Component, OnInit } from '@angular/core';

import { Photo } from '../../../_domain/photo';
import { AdminService } from '../../../_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.scss']
})
export class PhotoManagementComponent implements OnInit {
  public photosForApproval: Photo[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval(): void {
    this.adminService.getPhotosForApproval().subscribe(photos => this.photosForApproval = photos);
  }

  approvePhoto(photoId: number): void {
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photosForApproval = this.photosForApproval.filter(p => p.id !== photoId);
    });
  }

  rejectPhoto(photoId: number): void {
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photosForApproval = this.photosForApproval.filter(p => p.id !== photoId);
    });
  }
}

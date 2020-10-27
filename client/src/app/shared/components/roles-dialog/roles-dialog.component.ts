import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../../../_domain/user';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.scss']
})
export class RolesDialogComponent implements OnInit {
  public user: User;
  public roles: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<RolesDialogComponent>
  ) { }

  ngOnInit(): void {
    this.user = this.data.user;
    this.initializeRoles(this.user);
  }

  initializeRoles(user: User): void {
    this.roles = [];
    const availableRoles = [
      { name: 'Admin', checked: false },
      { name: 'Moderator', checked: false },
      { name: 'Member', checked: false }
    ];

    availableRoles.forEach(role => {
      for (const userRole of user.roles) {
        if (role.name === userRole) {
          role.checked = true;
          break;
        }
      }
      this.roles.push(role);
    });
  }

  updateRoles(): void {
    this.dialogRef.close(this.roles.filter(r => r.checked).map(r => r.name));
  }
}

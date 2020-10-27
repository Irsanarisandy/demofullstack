import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../../../_domain/user';
import { AdminService } from '../../../_services/admin.service';
import { RolesDialogComponent } from '../../../shared/components/roles-dialog/roles-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  private users: Partial<User[]>;
  public dataSource: MatTableDataSource<User>;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(): void {
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    });
  }

  editRoles(user: User): void {
    const dialogRef = this.dialog.open(RolesDialogComponent, {
      height: '260px',
      width: '300px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe((result: string[]) => {
      if (result && result.length > 0) {
        this.adminService.updateUserRoles(user.username, result).subscribe(() => {
          user.roles = [...result];
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;
        });
      }
    });
  }
}

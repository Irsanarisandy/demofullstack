import { NgModule } from '@angular/core';

import { AdminRoutingComponents, AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { PhotoManagementComponent } from './components/photo-management/photo-management.component';

@NgModule({
  declarations: [
    ...AdminRoutingComponents,
    UserManagementComponent,
    PhotoManagementComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }

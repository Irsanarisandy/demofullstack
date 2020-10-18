import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    LayoutRoutingModule,
    SharedModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }

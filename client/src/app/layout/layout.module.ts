import { NgModule } from '@angular/core';

import { LayoutRoutingComponent, LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { MemberMessagesComponent } from './components/member-messages/member-messages.component';

@NgModule({
  declarations: [
    ...LayoutRoutingComponent,
    LayoutComponent,
    NavComponent,
    FooterComponent,
    RegisterComponent,
    MemberCardComponent,
    MemberMessagesComponent
  ],
  imports: [
    LayoutRoutingModule,
    SharedModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }

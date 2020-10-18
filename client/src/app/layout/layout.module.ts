import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';

import { LayoutRoutingComponent, LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ...LayoutRoutingComponent,
    LayoutComponent,
    NavComponent,
    FooterComponent,
    RegisterComponent
  ],
  imports: [
    LayoutRoutingModule,
    SharedModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }

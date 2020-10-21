import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ListsComponent } from './pages/lists/lists.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { MemberListComponent } from './pages/member-list/member-list.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { TestErrorsComponent } from './pages/test-errors/test-errors.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'lists',
        component: ListsComponent
      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'members',
        component: MemberListComponent
      },
      {
        path: 'members/:username',
        component: MemberDetailComponent
      }
    ]
  },
  {
    path: 'test-errors',
    component: TestErrorsComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'server-error',
    component: ServerErrorComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

export const LayoutRoutingComponent = [
  HomeComponent,
  ListsComponent,
  MemberDetailComponent,
  MemberListComponent,
  MessagesComponent,
  TestErrorsComponent,
  NotFoundComponent,
  ServerErrorComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';
import { PreventUnsavedChangesGuard } from '../_guards/prevent-unsaved-changes.guard';
import { AdminGuard } from '../_guards/admin.guard';
import { MemberDetailResolver } from '../_resolvers/member-detail.resolver';
import { HomeComponent } from './pages/home/home.component';
import { ListsComponent } from './pages/lists/lists.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { MemberEditComponent } from './pages/member-edit/member-edit.component';
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
        path: 'member/edit',
        component: MemberEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard]
      },
      {
        path: 'members',
        component: MemberListComponent
      },
      {
        path: 'members/:username',
        component: MemberDetailComponent,
        resolve: { member: MemberDetailResolver }
      },
      {
        path: 'admin',
        loadChildren: () => import(`../admin/admin.module`).then(m => m.AdminModule),
        canActivate: [AdminGuard]
      }
    ]
  },
  {
    path: 'test-errors',
    component: TestErrorsComponent,
    canActivate: [AdminGuard]
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

export const LayoutRoutingComponents = [
  HomeComponent,
  ListsComponent,
  MemberDetailComponent,
  MemberEditComponent,
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

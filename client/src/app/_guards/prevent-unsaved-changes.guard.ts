import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { MemberEditComponent } from '../layout/pages/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditComponent): boolean {
    if (component.editAboutForm.dirty) {
      return confirm('Your changes are not saved yet, which will be lost.\nAre you sure you want to continue?');
    }
    return true;
  }
}

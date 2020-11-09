import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';

import { SharedMaterialModule } from './shared-material.module';
import { HasRoleDirective } from '../_directives/has-role.directive';
import { PhotoEditorComponent } from './components/photo-editor/photo-editor.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { RolesDialogComponent } from './components/roles-dialog/roles-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

const allModules = [
  CommonModule,
  HttpClientModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  NgxGalleryModule,
  NgxSpinnerModule,
  FileUploadModule,
  SharedMaterialModule
];

const allComponentsAndDirectives = [
  HasRoleDirective,
  PhotoEditorComponent,
  CustomInputComponent,
  RolesDialogComponent,
  ConfirmDialogComponent
];

@NgModule({
  declarations: allComponentsAndDirectives,
  imports: [
    ...allModules,
    TimeagoModule.forRoot()
  ],
  exports: [
    ...allModules,
    ...allComponentsAndDirectives,
    TimeagoModule
  ]
})
export class SharedModule { }

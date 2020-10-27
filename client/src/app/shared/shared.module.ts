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
import { PhotoEditorComponent } from './components/photo-editor/photo-editor.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';

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

@NgModule({
  declarations: [
    PhotoEditorComponent,
    CustomInputComponent
  ],
  imports: [
    ...allModules,
    TimeagoModule.forRoot()
  ],
  exports: [
    ...allModules,
    PhotoEditorComponent,
    CustomInputComponent,
    TimeagoModule
  ]
})
export class SharedModule { }

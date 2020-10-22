import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedMaterialModule } from './shared-material.module';
import { PhotoEditorComponent } from './components/photo-editor/photo-editor.component';

const allModules = [
  CommonModule,
  HttpClientModule,
  BrowserModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  FormsModule,
  NgxGalleryModule,
  NgxSpinnerModule,
  FileUploadModule,
  SharedMaterialModule
];

@NgModule({
  declarations: [
    PhotoEditorComponent
  ],
  imports: allModules,
  exports: [
    ...allModules,
    PhotoEditorComponent
  ]
})
export class SharedModule { }

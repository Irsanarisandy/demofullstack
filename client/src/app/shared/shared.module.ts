import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedMaterialModule } from './shared-material.module';

const allModules = [
  CommonModule,
  HttpClientModule,
  BrowserModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  FormsModule,
  NgxGalleryModule,
  NgxSpinnerModule,
  SharedMaterialModule
];

@NgModule({
  declarations: [],
  imports: allModules,
  exports: allModules
})
export class SharedModule { }

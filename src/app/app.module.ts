import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from './image/image.component';

import { AngularFileUploaderModule } from "angular-file-uploader";
import { ImageCropperModule } from 'ngx-image-cropper';



const appRoutes: Routes = [
  {
    path: 'images',
    component: ImageComponent,
    data: { title: 'Image' }
  },
  { path: '',
    redirectTo: '/images',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent
  ],
  imports: [
     BrowserModule,
  FormsModule,
  AngularFileUploaderModule,
  ImageCropperModule,
  HttpClientModule,
  RouterModule.forRoot(
    appRoutes  )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

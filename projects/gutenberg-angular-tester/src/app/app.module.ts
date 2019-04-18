import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GutenbergAngularModule } from 'gutenberg-angular';
import { tinymce } from 'tinymce';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GutenbergAngularModule.forRoot({
      wpApiSettings: {
        root: ''
      },
      userSettings: {
        uid: 2
      },
      wp: {apiFetch: null, url: null}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

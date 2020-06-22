import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { IetrComponent } from './components/ietr/ietr.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs'

export function getHighlightLanguages() {
  return {
    cpp: () => import('highlight.js/lib/languages/cpp')
  };
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainpageComponent,
    IetrComponent,
    routingComponents 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonToggleModule, 
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,     
    HttpClientModule,    
    BrowserAnimationsModule,
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages()
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { TheteamComponent } from './components/theteam/theteam.component';
import { MatVideoModule } from 'mat-video';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainpageComponent,
    IetrComponent,
    routingComponents,
    TheteamComponent 
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
    MatVideoModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

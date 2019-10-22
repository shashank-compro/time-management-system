import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { NavigationTopComponent } from './content-wrapper/navigation-top/navigation-top.component';
import { NavigationLeftComponent } from './content-wrapper/navigation-left/navigation-left.component';
import { DashboardComponent } from './content-wrapper/dashboard/dashboard.component';
import { LeavesComponent } from './content-wrapper/leaves/leaves.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TimeentriesComponent } from './content-wrapper//timeentries/timeentries.component';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ContentWrapperComponent,
    NavigationTopComponent,
    NavigationLeftComponent,
    DashboardComponent,
    LeavesComponent,
    PageNotFoundComponent,
    TimeentriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

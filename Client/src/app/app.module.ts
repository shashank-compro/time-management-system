import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationTopComponent } from './dashboard/navigation-top/navigation-top.component';
import { NavigationLeftComponent } from './dashboard/navigation-left/navigation-left.component';
import { ContentPageWrapperComponent } from './dashboard/content-page-wrapper/content-page-wrapper.component';
import { TimeentryComponent } from './dashboard/content-page-wrapper/timeentry/timeentry.component';
import { LeavesComponent } from './dashboard/content-page-wrapper/leaves/leaves.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    NavigationTopComponent,
    NavigationLeftComponent,
    ContentPageWrapperComponent,
    TimeentryComponent,
    LeavesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimeentriesService } from './services/timeentries/timeentries.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { NavigationTopComponent } from './content-wrapper/navigation-top/navigation-top.component';
import { NavigationLeftComponent } from './content-wrapper/navigation-left/navigation-left.component';
import { DashboardComponent } from './content-wrapper/dashboard/dashboard.component';
import { LeavesComponent } from './content-wrapper/leaves/leaves.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TimeentriesComponent } from './content-wrapper//timeentries/timeentries.component';
import { TimeentriesFormComponent } from './content-wrapper/timeentries/timeentries-form/timeentries-form.component'
import { TimeentriesTableComponent } from './content-wrapper/timeentries/timeentries-table/timeentries-table.component';
import { TimeentriesModalComponent } from './content-wrapper/timeentries/timeentries-modal/timeentries-modal.component'
import { LeavesFormComponent } from './content-wrapper/leaves/leaves-form/leaves-form.component';
import { LeavesListComponent } from './content-wrapper/leaves/leaves-list/leaves-list.component';
import { LeaveModalComponent } from './content-wrapper/leaves/leave-modal/leave-modal.component';
import { ProfileComponent } from './profile/profile.component';

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
    TimeentriesFormComponent,
    TimeentriesTableComponent,
    TimeentriesModalComponent,
    LeavesFormComponent,
    LeavesListComponent,
    LeaveModalComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule
  ],
  providers: [TimeentriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

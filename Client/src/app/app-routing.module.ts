import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './content-wrapper/dashboard/dashboard.component';
import { LeavesComponent } from './content-wrapper/leaves/leaves.component';
import { TimeentriesComponent } from './content-wrapper/timeentries/timeentries.component'
import { AppComponent } from './app.component'


const routes: Routes = [
  {
    path: 'app',
    component: AppComponent,
    children: [
          {
            path: 'login',
            component: LoginPageComponent
          },
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
          }
        ]
  },
  {
    path: 'app',
    component: ContentWrapperComponent,
    children: [
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'timeentries',
            component: TimeentriesComponent
          },
          {
            path: 'leaves',
            component: LeavesComponent
          },
        ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './content-wrapper/dashboard/dashboard.component';
import { LeavesComponent } from './content-wrapper/leaves/leaves.component';
import { TimeentriesComponent } from './content-wrapper/timeentries/timeentries.component'
import { AppComponent } from './app.component'
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'app',
    component: ContentWrapperComponent,
    children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'timeentries',
            component: TimeentriesComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'leaves',
            component: LeavesComponent,
            canActivate: [AuthGuard]
          },
        ],
        canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

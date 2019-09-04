import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'


const routes: Routes = [
  { path: '', redirectTo: '/login', 'pathMatch': 'full' },
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

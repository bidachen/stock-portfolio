import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';
import { TransactionsPageComponent } from './components/transactions-page/transactions-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent, canActivate: [AuthGuardService]},
  { path: 'portfolio', component: PortfolioPageComponent, canActivate: [AuthGuardService]},
  { path: 'transactions', component: TransactionsPageComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuardService]
})
export class AppRoutingModule { }

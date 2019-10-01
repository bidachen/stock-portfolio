import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';
import { TransactionPageComponent } from './components/transaction-page/transaction-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/LoginPageComponent', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'portfolio', component: PortfolioPageComponent },
  { path: 'transaction', component: TransactionPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

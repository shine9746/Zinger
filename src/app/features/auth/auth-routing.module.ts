import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page/login-page';
import { RegistrationPage } from './pages/registration/registration-page/registration-page';

const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegistrationPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MATERIAL_IMPORTS } from '../../shared/constants';
import { LoginPage } from './pages/login/login-page/login-page';
import { LoginForm } from './components/login-form/login-form/login-form';
import { CustomDatePicker, CustomInput, CustomRadio } from '../../shared/components';
import { RegistrationForm } from './components/registration-form/registration-form/registration-form';
import { RegistrationPage } from './pages/registration/registration-page/registration-page';

@NgModule({
  declarations: [
    LoginPage,
    LoginForm,
    RegistrationForm,
    RegistrationPage

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ...MATERIAL_IMPORTS,
    CustomInput,
    CustomDatePicker,
    CustomRadio]
})
export class AuthModule { }

import { Component, signal } from '@angular/core';
import { CustomToasterService } from '../../../../../shared/services/custom-toaster.service/custom-toaster';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  standalone: false
})
export class LoginForm {
  public email = signal('');
  public password = signal('');
  constructor(private customToasterService: CustomToasterService) { }

  public login() {
    this.customToasterService.success('Login successful!');
  }
}

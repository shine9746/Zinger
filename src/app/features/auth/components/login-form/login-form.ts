import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomToasterService } from '../../../../shared/services/custom-toaster.service/custom-toaster';
import { Router } from '@angular/router';
import { CustomInput } from '../../../../shared/components';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  standalone: true,
  imports: [FormsModule, CustomInput]
})
export class LoginForm {
  private customToasterService = inject(CustomToasterService);
  private router = inject(Router);
  public email = signal('');
  public password = signal('');

  public login(): void {
    this.customToasterService.success('Login successful!');
    this.router.navigate(['/auth/login']);
  }
}

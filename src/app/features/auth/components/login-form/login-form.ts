import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomToasterService } from '../../../../shared/services/custom-toaster.service/custom-toaster';
import { Router } from '@angular/router';
import { CustomInput } from '../../../../shared/components';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatIconModule, MatTooltipModule, CustomInput]
})
export class LoginForm {
  private customToasterService = inject(CustomToasterService);
  private router = inject(Router);
  public email = signal('');
  public password = signal('');
  public isLoading = signal(false);

  public login(): void {
    if (!this.email() || !this.password()) {
      this.customToasterService.error('Please fill in all fields');
      return;
    }
    this.isLoading.set(true);
    setTimeout(() => {
      this.customToasterService.success('Login successful!');
      this.router.navigate(['/dashboard']);
      this.isLoading.set(false);
    }, 1000);
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoginForm } from '../../../components/login-form/login-form';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, LoginForm]
})
export class LoginPage {
  private router = inject(Router);
  public register(): void {
    this.router.navigate(['/auth/register']);
  }
  
  public login(): void {
    this.router.navigate(['/dashboard']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  standalone: false
})
export class LoginPage {
  constructor(private router: Router) { }
  public register() {
    this.router.navigate(['/auth/register']);
  }
  public login() {
    this.router.navigate(['/dashboard']);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginForm } from '../../components/login-form/login-form';
import { IconService } from '../../../../core/services/icon.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { CacheService } from '../../../../core/services/cache.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, LoginForm]
})
export class LoginPage implements OnInit {
  private router = inject(Router);
  private iconService = inject(IconService);
  private themeService = inject(ThemeService);
  private cacheService = inject(CacheService);
  ingerVisible = false;

  ngOnInit(): void {
    // Initialize theme persistence
    this.themeService.watchSystemTheme();

    // Save login page state to cache for recovery on power loss
    this.cacheService.setPersistent('last-page', 'login');
  }

  public onLogoClick(): void {
    // Add smooth, elegant rotate and scale animation to logo
    const logoElement = document.querySelector('.logo-badge');
    const ingerElement = document.querySelector('.logo-text-inger');
    
    if (logoElement && ingerElement) {
      logoElement.classList.add('logo-bounce');
      // Show INGER text during animation
      this.ingerVisible = true;
      
      // Remove only the logo animation class after it completes
      // INGER text stays visible
      setTimeout(() => {
        logoElement?.classList.remove('logo-bounce');
        // Keep ingerVisible = true so INGER stays on screen
      }, 2500); // Match animation duration (2.5s)
    }
  }

  public register(): void {
    this.router.navigate(['/auth/register']);
  }

  public login(): void {
    // Save execution state before navigation
    this.cacheService.saveExecutionState({
      action: 'login',
      timestamp: Date.now(),
      page: 'login'
    });
    this.router.navigate(['/dashboard']);
  }
}

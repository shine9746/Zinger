import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <div class="theme-toggle-container">
      <div class="theme-toggle-wrapper">
        <!-- Theme toggle button with smooth animation -->
        <button
          mat-icon-button
          (click)="toggleTheme()"
          [attr.aria-label]="'Toggle ' + (themeService.currentTheme() === 'light' ? 'dark' : 'light') + ' mode'"
          class="theme-toggle-button"
          [class.dark-mode]="themeService.currentTheme() === 'dark'"
          matTooltip="Toggle Dark/Light Mode"
          matTooltipPosition="below">
          
          <!-- Sun icon for light mode -->
          <div class="icon-wrapper" *ngIf="themeService.currentTheme() === 'light'">
            <mat-icon class="theme-icon sun-icon">wb_sunny</mat-icon>
          </div>
          
          <!-- Moon icon for dark mode -->
          <div class="icon-wrapper" *ngIf="themeService.currentTheme() === 'dark'">
            <mat-icon class="theme-icon moon-icon">nights_stay</mat-icon>
          </div>
        </button>
      </div>

      <!-- Animated background -->
      <div class="toggle-background"></div>
    </div>
  `,
  styles: [`
    :host {
      --toggle-size: 48px;
      --toggle-padding: 4px;
    }

    .theme-toggle-container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: var(--toggle-size);
    }

    .theme-toggle-wrapper {
      position: relative;
      z-index: 2;
    }

    /* Main toggle button */
    .theme-toggle-button {
      width: var(--toggle-size);
      height: var(--toggle-size);
      min-width: var(--toggle-size);
      min-height: var(--toggle-size);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      background: linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(212, 165, 116, 0.05));
      color: var(--color-primary);
      border: 2px solid rgba(212, 165, 116, 0.3);
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &:hover {
        background: linear-gradient(135deg, rgba(212, 165, 116, 0.2), rgba(212, 165, 116, 0.1));
        border-color: var(--color-primary);
        box-shadow: 0 0 16px rgba(212, 165, 116, 0.3);
        transform: scale(1.12);
      }

      &:active {
        transform: scale(0.95);
      }

      &.dark-mode {
        color: var(--color-primary-light);
        border-color: rgba(212, 165, 116, 0.2);
      }

      &.dark-mode:hover {
        box-shadow: 0 0 16px rgba(212, 165, 116, 0.2);
      }
    }

    /* Icon wrapper with animation */
    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      animation: iconRotate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .theme-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      transition: all 0.3s ease;
    }

    .sun-icon {
      animation: sunRotate 0.6s ease;
    }

    .moon-icon {
      animation: moonRotate 0.6s ease;
    }

    /* Background pulse animation */
    .toggle-background {
      position: absolute;
      width: var(--toggle-size);
      height: var(--toggle-size);
      border-radius: 50%;
      background: rgba(212, 165, 116, 0.1);
      animation: pulse 2s ease-in-out infinite;
      z-index: 0;
    }

    /* Animations */
    @keyframes iconRotate {
      0% {
        opacity: 0;
        transform: rotate(-180deg) scale(0.8);
      }
      100% {
        opacity: 1;
        transform: rotate(0) scale(1);
      }
    }

    @keyframes sunRotate {
      0% {
        transform: rotate(-180deg);
      }
      100% {
        transform: rotate(0);
      }
    }

    @keyframes moonRotate {
      0% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(0);
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0;
      }
      50% {
        transform: scale(1.3);
        opacity: 0.3;
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      :host {
        --toggle-size: 44px;
      }

      .theme-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .theme-toggle-button,
      .icon-wrapper,
      .sun-icon,
      .moon-icon,
      .toggle-background {
        animation: none !important;
        transition: none !important;
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  themeService = inject(ThemeService);

  ngOnInit(): void {
    // Watch for system theme changes
    this.themeService.watchSystemTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

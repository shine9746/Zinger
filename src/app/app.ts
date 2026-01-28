import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomToaster } from './shared/components/custom-toaster/custom-toaster';
import { ThemeService } from './core/services/theme.service';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomToaster, ThemeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('projectZ');
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    // Initialize theme on app startup
    this.themeService.watchSystemTheme();
  }
}

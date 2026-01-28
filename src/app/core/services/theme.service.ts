import { Injectable, signal, effect } from '@angular/core';
import { CacheService } from './cache.service';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private readonly DEFAULT_THEME: ThemeMode = 'light';
  private readonly MUSTARD_PRIMARY = '#d4a574';
  private readonly MUSTARD_DARK = '#1a1410';

  // Signal to track current theme - initialized with default, then updated after construction
  currentTheme = signal<ThemeMode>('light');
  private initialized = false;

  constructor(private cacheService: CacheService) {
    // Initialize theme after constructor
    const initialTheme = this.getInitialTheme();
    this.currentTheme.set(initialTheme);
    
    // Apply theme whenever it changes
    effect(() => {
      const theme = this.currentTheme();
      this.applyTheme(theme);
      this.saveThemePreference(theme);
      // Save to cache for persistence
      this.cacheService.setPersistent(this.THEME_KEY, theme);
    });
    
    this.initialized = true;
  }

  /**
   * Get initial theme from localStorage or system preference
   */
  private getInitialTheme(): ThemeMode {
    // Check cache first (survives power loss)
    const cached = this.cacheService.getPersistent(this.THEME_KEY) as ThemeMode | undefined;
    if (cached && (cached === 'light' || cached === 'dark')) {
      return cached;
    }

    // Check localStorage
    const saved = localStorage.getItem(this.THEME_KEY) as ThemeMode | null;
    if (saved && (saved === 'light' || saved === 'dark')) {
      return saved;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return this.DEFAULT_THEME;
  }

  /**
   * Apply theme to HTML element
   */
  private applyTheme(theme: ThemeMode): void {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', theme);

    // Also update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? this.MUSTARD_DARK : this.MUSTARD_PRIMARY
      );
    }

    // Update background color for seamless integration
    document.body.style.backgroundColor = 
      theme === 'dark' ? 'var(--color-bg)' : 'var(--color-bg)';
  }

  /**
   * Save theme preference to localStorage
   */
  private saveThemePreference(theme: ThemeMode): void {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.currentTheme.set(newTheme);
  }

  /**
   * Set specific theme
   */
  setTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
  }

  /**
   * Get current theme
   */
  getTheme(): ThemeMode {
    return this.currentTheme();
  }

  /**
   * Get theme as observable signal
   */
  getThemeSignal() {
    return this.currentTheme.asReadonly();
  }

  /**
   * Listen for system theme changes
   */
  watchSystemTheme(): void {
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkModeQuery.addEventListener('change', (e) => {
        // Only apply if user hasn't manually set preference
        if (!this.cacheService.hasPersistent(this.THEME_KEY)) {
          this.currentTheme.set(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /**
   * Get mustard primary color (used across app)
   */
  getMustardColor(): string {
    return this.MUSTARD_PRIMARY;
  }

  /**
   * Get mustard dark variant for dark mode
   */
  getMustardDarkColor(): string {
    return this.MUSTARD_DARK;
  }
}


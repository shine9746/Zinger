import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Icon Service - Singleton for managing application icons globally
 * Provides centralized icon management, allowing tweaks across the entire application
 */
@Injectable({
  providedIn: 'root'
})
export class IconService {
  // Icon configuration that can be modified globally
  private iconConfig = {
    size: '24px',
    viewBox: '0 0 24 24',
    strokeWidth: '2',
    fill: 'none',
  };

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerCustomIcons();
  }

  /**
   * Register all custom SVG icons
   */
  private registerCustomIcons(): void {
    // Zinger App Logo Icon
    this.registerIcon('zinger-logo', this.getZingerLogoSVG());
    
    // Custom action icons
    this.registerIcon('search-icon', this.getSearchIconSVG());
    this.registerIcon('menu-icon', this.getMenuIconSVG());
    this.registerIcon('close-icon', this.getCloseIconSVG());
    this.registerIcon('success-icon', this.getSuccessIconSVG());
    this.registerIcon('error-icon', this.getErrorIconSVG());
    this.registerIcon('warning-icon', this.getWarningIconSVG());
    this.registerIcon('info-icon', this.getInfoIconSVG());
    
    // Button icons
    this.registerIcon('login-icon', this.getLoginIconSVG());
    this.registerIcon('register-icon', this.getRegisterIconSVG());
    this.registerIcon('submit-icon', this.getSubmitIconSVG());
  }

  /**
   * Register a custom SVG icon
   */
  private registerIcon(name: string, svgContent: string): void {
    this.matIconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,' + btoa(svgContent))
    );
  }

  /**
   * Update global icon configuration
   */
  updateIconConfig(config: Partial<typeof this.iconConfig>): void {
    this.iconConfig = { ...this.iconConfig, ...config };
  }

  /**
   * Get current icon configuration
   */
  getIconConfig() {
    return { ...this.iconConfig };
  }

  /**
   * Get icon size
   */
  getIconSize(): string {
    return this.iconConfig.size;
  }

  /**
   * Update icon size globally
   */
  setIconSize(size: string): void {
    this.iconConfig.size = size;
  }

  // ===== CUSTOM SVG ICONS =====

  /**
   * Zinger App Logo - Modern Z icon with food theme
   */
  private getZingerLogoSVG(): string {
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="zingerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#d4a574;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#9d7c51;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Main circle background -->
        <circle cx="50" cy="50" r="48" fill="url(#zingerGradient)"/>
        
        <!-- Clean, elegant Z letter -->
        <g fill="white">
          <!-- Top horizontal line of Z -->
          <path d="M 28 32 L 72 32" stroke="white" stroke-width="6" fill="none" stroke-linecap="round"/>
          
          <!-- Diagonal line of Z -->
          <path d="M 70 32 L 30 68" stroke="white" stroke-width="6" fill="none" stroke-linecap="round"/>
          
          <!-- Bottom horizontal line of Z -->
          <path d="M 28 68 L 72 68" stroke="white" stroke-width="6" fill="none" stroke-linecap="round"/>
        </g>
      </svg>
    `;
  }

  /**
   * Search Icon
   */
  private getSearchIconSVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    `;
  }

  /**
   * Menu/Hamburger Icon
   */
  private getMenuIconSVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;
  }

  /**
   * Close Icon
   */
  private getCloseIconSVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
  }

  /**
   * Success Icon
   */
  private getSuccessIconSVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
  }

  /**
   * Error Icon
   */
  private getErrorIconSVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    `;
  }

  /**
   * Warning Icon
   */
  private getWarningIconSVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    `;
  }

  /**
   * Info Icon
   */
  private getInfoIconSVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `;
  }

  /**
   * Login Icon
   */
  private getLoginIconSVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </svg>
    `;
  }

  /**
   * Register Icon
   */
  private getRegisterIconSVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
        <line x1="12" y1="12" x2="12" y2="18"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>
    `;
  }

  /**
   * Submit Icon
   */
  private getSubmitIconSVG(): string {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 2 11 13"></polyline>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;
  }
}

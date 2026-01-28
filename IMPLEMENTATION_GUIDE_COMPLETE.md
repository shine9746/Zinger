# 🎓 Zinger App UI System - Developer Implementation Guide

## Table of Contents
1. [Services Setup](#services-setup)
2. [Component Usage](#component-usage)
3. [Styling & Theming](#styling--theming)
4. [Responsive Design](#responsive-design)
5. [Animations](#animations)
6. [Common Patterns](#common-patterns)
7. [Troubleshooting](#troubleshooting)

---

## Services Setup

### Injecting Services

All services are provided at root level and can be injected directly:

```typescript
import { ThemeService } from '@app/core/services/theme.service';
import { IconService } from '@app/core/services/icon.service';
import { CacheService } from '@app/core/services/cache.service';

@Component({...})
export class MyComponent {
  themeService = inject(ThemeService);
  iconService = inject(IconService);
  cacheService = inject(CacheService);
}
```

### Theme Service - Full API

```typescript
// Get current theme
const current = themeService.getTheme(); // 'light' | 'dark'

// Toggle theme
themeService.toggleTheme();

// Set specific theme
themeService.setTheme('dark');

// Subscribe to theme changes
themeService.getThemeSignal().subscribe(theme => {
  console.log('Theme changed to:', theme);
});

// Watch system preference changes
themeService.watchSystemTheme();

// Get mustard colors
const primary = themeService.getMustardColor(); // #d4a574
const dark = themeService.getMustardDarkColor(); // #9d7c51
```

### Icon Service - Full API

```typescript
// Use custom icons in templates
<mat-icon svgIcon="zinger-logo"></mat-icon>
<mat-icon svgIcon="search-icon"></mat-icon>
<mat-icon svgIcon="success-icon"></mat-icon>

// Update icon configuration
iconService.updateIconConfig({
  size: '32px',
  viewBox: '0 0 24 24',
  strokeWidth: '2'
});

// Get current config
const config = iconService.getIconConfig();

// Update size
iconService.setIconSize('24px');
const size = iconService.getIconSize();

// Available icons
const icons = [
  'zinger-logo',      // Zinger brand icon
  'search-icon',      // Search function
  'menu-icon',        // Menu/navigation
  'close-icon',       // Close/dismiss
  'success-icon',     // Success status
  'error-icon',       // Error status
  'warning-icon',     // Warning status
  'info-icon'         // Info status
];
```

### Cache Service - Full API

```typescript
// === PERSISTENT STORAGE (survives restarts) ===
cacheService.setPersistent('theme', 'dark');
const theme = cacheService.getPersistent('theme');
cacheService.removePersistent('theme');
cacheService.clearPersistent(); // Clear all
cacheService.hasPersistent('theme'); // true/false
cacheService.getPersistentKeys(); // ['theme', ...]

// === SESSION STORAGE (current session only) ===
cacheService.setSession('userId', '123');
const userId = cacheService.getSession('userId');
cacheService.removeSession('userId');
cacheService.clearSession(); // Clear all
cacheService.hasSession('userId'); // true/false
cacheService.getSessionKeys(); // ['userId', ...]

// === EXECUTION STATE (power loss recovery) ===
cacheService.saveExecutionState({
  action: 'login',
  timestamp: Date.now(),
  page: 'login'
});
const state = cacheService.recoverExecutionState();

// === FORM DATA PRESERVATION ===
// Save form data when user is typing
cacheService.saveFormData('loginForm', {
  email: 'user@example.com',
  password: '...'
});

// Recover form data on page load
const formData = cacheService.recoverFormData('loginForm');
if (formData) {
  form.patchValue(formData);
}

// Clear old form data (24h expiry)
cacheService.clearExpiredFormData('loginForm');

// === UTILITIES ===
const stats = cacheService.getCacheStats();
// { persistent: 5, session: 3, total: 8 }

const exported = cacheService.exportCache();
// { persistent: {...}, session: {...} }

cacheService.importCache({
  persistent: { theme: 'dark' },
  session: { userId: '123' }
});
```

---

## Component Usage

### Theme Toggle Component

```html
<!-- Simple placement in any component -->
<app-theme-toggle></app-theme-toggle>

<!-- Usually in header/navbar -->
<header>
  <h1>My App</h1>
  <app-theme-toggle></app-theme-toggle>
</header>
```

**Features:**
- Animated sun/moon icons
- Smooth transitions
- Accessible (ARIA labels)
- Respects reduced motion preferences
- Auto-saves preference

### Custom Input Components (48px Height)

```html
<!-- Email Input -->
<app-custom-input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  [required]="true"
  [(ngModel)]="email"
  (change)="onEmailChange($event)">
</app-custom-input>

<!-- Password Input with visibility toggle -->
<app-custom-input
  label="Password"
  type="password"
  placeholder="Enter your password"
  [required]="true"
  [(ngModel)]="password">
</app-custom-input>

<!-- Text Input -->
<app-custom-input
  label="Full Name"
  type="text"
  placeholder="John Doe"
  [(ngModel)]="name">
</app-custom-input>

<!-- Date Picker -->
<app-custom-date-picker
  label="Birth Date"
  [(ngModel)]="birthDate"
  [required]="true">
</app-custom-date-picker>

<!-- Radio Buttons -->
<app-custom-radio
  label="Select Your Plan"
  [options]="[
    { label: 'Basic', value: 'basic' },
    { label: 'Premium', value: 'premium' },
    { label: 'Enterprise', value: 'enterprise' }
  ]"
  [(ngModel)]="selectedPlan"
  [required]="true">
</app-custom-radio>
```

**All custom inputs have:**
- 48px fixed height (accessible)
- Focus animations with bottom border
- Hover effects
- Error state support
- Disabled state support
- Smooth transitions

---

## Styling & Theming

### Using CSS Variables

```scss
// In your component SCSS
.my-element {
  background-color: var(--color-primary);      // Mustard
  color: var(--color-text);                     // Auto-adjusts for theme
  border: 2px solid var(--color-border);        // Theme-aware
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: var(--space-4);                      // 16px
  border-radius: var(--radius-lg);              // 12px
  transition: all var(--transition-base);       // 200ms
}

// Hover state
&:hover {
  background-color: var(--color-primary-dark); // Darker mustard
}

// Dark mode automatically handled
[data-theme="dark"] & {
  // Colors auto-adjust via CSS variables
  // No need for separate dark mode styles!
}
```

### Color Palette

```scss
// Primary (Mustard)
--color-primary: #d4a574;
--color-primary-light: #e8c4a0;
--color-primary-dark: #9d7c51;

// Text colors
--color-text: #111827;              // Light mode
--color-text-secondary: #4b5563;    // Light mode
--color-text-tertiary: #9ca3af;     // Light mode

// Backgrounds
--color-bg: #faf8f6;                // Light mustard-tinted
--color-surface: #ffffff;           // Cards, panels
--color-surface-hover: #f5f1ed;     // Hover state

// Accents
--color-success: #10b981;           // Green
--color-danger: #ef4444;            // Red
--color-warning: #f97316;           // Orange
--color-info: #3b82f6;              // Blue

// Borders
--color-border: #e8c4a0;            // Mustard-based
--color-divider: #e8c4a0;           // Divider lines
```

### Spacing Scale

```scss
// Use these for consistent spacing
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;     // Most common
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-12: 48px;

// Usage
padding: var(--space-4);            // 16px
margin: var(--space-3);             // 12px
gap: var(--space-6);                // 24px
```

### Border Radius Options

```scss
--radius-sm:  4px;
--radius-md:  8px;
--radius-lg:  12px;    // Default for inputs
--radius-xl:  16px;
--radius-2xl: 20px;    // Cards
--radius-full: 999px;  // Circles, pills
```

---

## Responsive Design

### Using Media Queries

```scss
// Mobile first approach
.my-element {
  // Mobile styles (default)
  font-size: var(--fs-md);
  padding: var(--space-4);
  
  // Tablet
  @media (min-width: 768px) {
    font-size: var(--fs-lg);
    padding: var(--space-6);
  }
  
  // Desktop
  @media (min-width: 1024px) {
    font-size: var(--fs-xl);
    padding: var(--space-8);
  }
}

// Or use max-width for "and below"
@media (max-width: 480px) {
  // Mobile phones only
  .my-element {
    width: 100%;
  }
}
```

### Responsive Utilities

```html
<!-- Hide/Show at breakpoints -->
<div class="hide-xs">Hidden on mobile</div>
<div class="show-xs">Visible only on mobile</div>
<div class="hide-sm">Hidden on small devices</div>

<!-- Responsive grids -->
<div class="grid-3">
  <!-- 3 columns on desktop, 2 on tablet, 1 on mobile -->
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Container with responsive padding -->
<div class="container-responsive">
  <h1>Page Title</h1>
  <p>Content with automatic padding</p>
</div>

<!-- Responsive spacing -->
<div class="px-responsive py-responsive">
  Horizontal and vertical padding scale with screen
</div>

<!-- Responsive typography -->
<h1 class="heading-responsive">Scales with screen size</h1>
<p class="text-responsive">Text also scales</p>
```

### Breakpoint Reference

```
xs:  320px  (mobile phones)
sm:  640px  (small devices)
md:  768px  (tablets)
lg:  1024px (desktop)
xl:  1280px (large desktop)
2xl: 1536px (ultra-wide)
```

---

## Animations

### Simple Entrance Animations

```html
<!-- Fade in -->
<div class="animate-fade-in">Appears smoothly</div>

<!-- Slide up -->
<div class="animate-slide-in-up">Slides from bottom</div>

<!-- Slide down -->
<div class="animate-slide-in-down">Slides from top</div>

<!-- Scale in -->
<div class="animate-scale-in">Grows into view</div>

<!-- Bounce in -->
<div class="animate-bounce-in">Bouncy entrance</div>
```

### Interactive Effects

```html
<!-- Lifts on hover -->
<div class="hover-lift">
  Elevation effect on hover
</div>

<!-- Scales on hover -->
<div class="hover-scale">
  Gets bigger on hover
</div>

<!-- Glows on hover -->
<div class="hover-glow">
  Glowing effect on hover
</div>

<!-- Card elevation -->
<mat-card class="card-hover">
  Lifts and casts shadow on hover
</mat-card>
```

### Loading States

```html
<!-- Shimmer skeleton -->
<div class="skeleton"></div>
<div class="skeleton" style="margin-top: 16px;"></div>
<div class="skeleton" style="margin-top: 16px;"></div>

<!-- Pulsing animation -->
<div class="animate-pulse">Loading...</div>

<!-- Spinning loader -->
<mat-icon class="animate-spin">hourglass_empty</mat-icon>

<!-- Button loading state -->
<button class="is-loading">Processing...</button>
```

### Custom Animations

```scss
// Create your own animation
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.my-animation {
  animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Common Patterns

### Login Page Pattern

```html
<div class="login-page">
  <div class="login-container animate-fade-in">
    <mat-card class="login-card shadow-lg rounded-xl hover-lift">
      <!-- Header -->
      <div class="login-header mb-8 text-center">
        <div class="logo-badge mb-6 animate-scale-in">
          <mat-icon svgIcon="zinger-logo"></mat-icon>
        </div>
        <h1 class="brand-title">ZINGER</h1>
        <p class="brand-tagline">Fast. Fresh. Delivered.</p>
      </div>

      <!-- Form -->
      <div class="form-container">
        <app-login-form></app-login-form>
      </div>

      <!-- Footer -->
      <div class="login-footer">
        <p>Your data is secure and encrypted</p>
      </div>
    </mat-card>
  </div>
</div>
```

### Card Grid Pattern

```html
<div class="container-responsive">
  <h1 class="heading-responsive mb-8">Featured Items</h1>
  <div class="grid-3 gap-6">
    <mat-card class="card-hover rounded-xl overflow-hidden">
      <img src="..." alt="Item" />
      <mat-card-content>
        <h3>Item Title</h3>
        <p>Description</p>
      </mat-card-content>
    </mat-card>
    <!-- Repeat for more cards -->
  </div>
</div>
```

### Form Pattern

```html
<form class="p-responsive">
  <h2 class="mb-6">Create Account</h2>

  <app-custom-input
    label="Email"
    type="email"
    [(ngModel)]="email"
    class="mb-4"
    required>
  </app-custom-input>

  <app-custom-input
    label="Password"
    type="password"
    [(ngModel)]="password"
    class="mb-4"
    required>
  </app-custom-input>

  <app-custom-input
    label="Full Name"
    type="text"
    [(ngModel)]="name"
    class="mb-6"
    required>
  </app-custom-input>

  <button class="btn-primary btn-full" (click)="submit()">
    Create Account
  </button>
  <button class="btn-outline btn-full mt-2" (click)="cancel()">
    Cancel
  </button>
</form>
```

### Header with Theme Toggle

```html
<header class="px-responsive py-responsive flex justify-between items-center">
  <div class="flex items-center gap-4">
    <mat-icon svgIcon="zinger-logo" class="text-2xl"></mat-icon>
    <h1>Zinger</h1>
  </div>

  <nav class="flex gap-6 hide-xs">
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>

  <app-theme-toggle></app-theme-toggle>
</header>
```

---

## Troubleshooting

### Theme Not Changing

```typescript
// Check if service is initialized
const currentTheme = this.themeService.getTheme();
console.log('Current theme:', currentTheme);

// Check if HTML element has data-theme attribute
console.log(document.documentElement.getAttribute('data-theme'));

// Watch for changes
this.themeService.getThemeSignal().subscribe(theme => {
  console.log('Theme changed to:', theme);
});
```

### Icons Not Showing

```typescript
// Verify icons are registered
const config = this.iconService.getIconConfig();
console.log('Icon config:', config);

// Check if icon name is correct
// Available: zinger-logo, search-icon, success-icon, error-icon, warning-icon, info-icon, menu-icon, close-icon

// Ensure MatIconModule is imported
import { MatIconModule } from '@angular/material/icon';
```

### Cache Not Persisting

```typescript
// Check localStorage is enabled
console.log(typeof localStorage); // "object"

// Verify cache has data
const cached = this.cacheService.exportCache();
console.log('Cache contents:', cached);

// Check browser console for storage quota errors
// Try clearing and resetting
this.cacheService.clearPersistent();
this.cacheService.setPersistent('test', 'value');
```

### Responsive Not Working

```typescript
// Check if viewport meta tag exists in index.html
// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// Test at actual breakpoints
// Use Chrome DevTools: Ctrl+Shift+M to toggle device toolbar

// Verify media queries are correct
// @media (max-width: 768px) { /* 768px and below */ }
// @media (min-width: 768px) { /* 768px and above */ }
```

### Animation Lag

```scss
// Use GPU-accelerated properties only
// ✅ Good
.element {
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-4px);
  }
}

// ❌ Avoid
.element {
  transition: all 0.3s ease; // Too broad
  &:hover {
    margin-top: -4px;       // Causes repaint
  }
}
```

---

## Best Practices

1. **Always use CSS variables for colors**
   ```scss
   background: var(--color-primary); // Not #d4a574
   ```

2. **Keep animations short** (0.3-0.6s ideal)
   ```scss
   transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
   ```

3. **Mobile-first approach**
   ```scss
   // Mobile styles first
   padding: 16px;
   
   // Then override for larger screens
   @media (min-width: 768px) {
     padding: 32px;
   }
   ```

4. **Cache wisely**
   ```typescript
   // Use persistent for preferences
   this.cacheService.setPersistent('theme', 'dark');
   
   // Use session for temporary data
   this.cacheService.setSession('formDraft', formData);
   ```

5. **Test responsiveness**
   - Use Chrome DevTools device toolbar
   - Test at actual breakpoints: 320, 640, 768, 1024, 1280
   - Check landscape and portrait modes

---

**Happy coding! 🚀**

For full details, see `UI_DESIGN_DOCUMENTATION.md`

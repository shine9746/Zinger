# 🎨 FoodHub UI System - Quick Reference

## 🎯 What's New

Your FoodHub app now has:
- ✅ Light/Dark mode with one-click toggle
- ✅ Professional design system
- ✅ Responsive mobile-friendly layout
- ✅ Smooth animations
- ✅ Unified input styling
- ✅ Modern mustard-themed brand colors

---

## 🌓 Theme System

### How Theme Switching Works
1. Click the moon/sun icon in the top-right corner
2. Theme instantly switches between light and dark
3. Your preference is saved automatically
4. System preference is detected on first load

### Using Theme in Components
```typescript
import { ThemeService } from '@app/core/services/theme.service';

export class MyComponent {
  themeService = inject(ThemeService);
  
  currentTheme = this.themeService.currentTheme(); // 'light' | 'dark'
  
  toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}
```

### CSS Styling for Theme
```scss
[data-theme='dark'] {
  // Dark mode styles
  background-color: #0f172a;
  color: #f1f5f9;
}

[data-theme='light'] {
  // Light mode styles
  background-color: #f9fafb;
  color: #111827;
}
```

---

## 🎨 Color System

### Brand Colors
```scss
--color-brand: #d4a574;        // Mustard
--color-primary: #22c55e;      // Green
--color-danger: #ef4444;       // Red
--color-secondary: #3b82f6;    // Blue
```

### Using Colors
```scss
background-color: var(--color-brand);      // Mustard
background-color: var(--color-primary);    // Green
background-color: var(--color-danger);     // Red

// Text colors automatically adjust in dark/light mode
color: var(--color-primary-text);      // Primary text
color: var(--color-secondary-text);    // Secondary text
color: var(--color-tertiary-text);     // Tertiary text
```

---

## 📏 Spacing System

All spacing uses the design tokens:

```scss
gap: var(--space-4);        // 16px
padding: var(--space-3);    // 12px
margin: var(--space-6);     // 24px

// Responsive margins
margin: var(--space-4);     // 16px on desktop
@media (max-width: 768px) { margin: var(--space-3); }  // 12px on tablet
@media (max-width: 480px) { margin: var(--space-2); }  // 8px on mobile
```

---

## 🎨 Input Styling

### Height Standard
All inputs are **48px height**:
- Desktop: 48px
- Tablet (768px): 44px
- Mobile (480px): 42px

### Using Custom Input Component
```html
<app-custom-input 
  label="Email"
  inputType="email"
  [required]="true"
  placeholder="Enter your email"
  [(inputValue)]="email">
</app-custom-input>
```

### Input Focus Animation
Inputs automatically get:
- 4px colored glow on focus
- TranslateY(-2px) lift effect
- Smooth border color change
- Validation states (green, red, orange)

---

## ✨ Animation System

### Available Animations
```scss
// Fade animations
.animate-fade-in { animation: fadeIn 0.6s ease-out; }

// Slide animations
.animate-slide-in-up { animation: slideInUp 0.6s ease-out; }
.animate-slide-in-down { animation: slideInDown 0.6s ease-out; }
.animate-slide-in-left { animation: slideInLeft 0.6s ease-out; }
.animate-slide-in-right { animation: slideInRight 0.6s ease-out; }

// Scale animations
.animate-scale-in { animation: scaleIn 0.5s ease-out; }

// Pulse animations
.animate-pulse-light { animation: pulseLight 2s ease-in-out infinite; }
```

### Using Animations
```html
<div class="animate-fade-in">
  Fades in smoothly
</div>

<div class="animate-slide-in-up" style="--delay: 0.2s">
  Slides up with delay
</div>
```

### Custom Animation with Delay
```scss
.my-element {
  animation: slideInUp 0.6s ease-out;
  animation-delay: var(--delay, 0);
  animation-fill-mode: both;
}

// In HTML:
<div class="my-element" style="--delay: 0.1s">Content</div>
```

---

## 📱 Responsive Design

### Breakpoints
```scss
// Default (desktop)
width: 100%;

// Tablet - 768px and below
@media (max-width: 768px) {
  width: 90%;
}

// Mobile - 480px and below
@media (max-width: 480px) {
  width: 100%;
}
```

### Common Patterns
```scss
// Mobile-first button
button {
  padding: var(--space-2);  // Small on mobile
  
  @media (max-width: 768px) {
    padding: var(--space-3);  // Medium on tablet
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;  // Smaller text
  }
}
```

---

## 🔧 Component Examples

### Login Page Pattern
```typescript
@Component({
  selector: 'app-login',
  template: `
    <div class="login-container animate-fade-in">
      <mat-card class="login-card">
        <div class="logo-badge">
          <mat-icon>restaurant_menu</mat-icon>
        </div>
        <app-login-form></app-login-form>
      </mat-card>
    </div>
  `,
  styleUrl: './login.scss'
})
export class LoginPage { }
```

### Form Pattern
```html
<form class="login-form">
  <div class="form-group animate-slide-in-left" style="--delay: 0">
    <app-custom-input 
      label="Email" 
      inputType="email"
      placeholder="your@email.com">
    </app-custom-input>
  </div>
  
  <div class="form-group animate-slide-in-left" style="--delay: 0.1s">
    <app-custom-input 
      label="Password" 
      inputType="password"
      placeholder="Enter password">
    </app-custom-input>
  </div>
  
  <button type="submit" class="btn-primary btn-full">
    <mat-icon>login</mat-icon>
    Sign In
  </button>
</form>
```

---

## 🎯 Best Practices

### DO ✅
- Use CSS variables for colors and spacing
- Use responsive media queries
- Apply animations with staggered delays
- Keep input height at 48px
- Use Material icons from `@angular/material/icon`
- Follow the spacing scale
- Test on mobile devices

### DON'T ❌
- Hard-code colors (use CSS variables)
- Skip responsive design
- Use too many animations (keep it subtle)
- Change input height arbitrarily
- Forget accessibility (alt text, labels, ARIA)
- Use inline styles (use SCSS)

---

## 🚀 Common Tasks

### Add a New Page
1. Create component in `features/[feature]/pages/`
2. Import Material modules needed
3. Add to routing
4. Apply theme-aware colors using CSS variables
5. Use responsive media queries
6. Add animations for visual polish

### Style a New Component
1. Use `--space-*` for spacing
2. Use `var(--color-*)` for colors
3. Add responsive design with media queries
4. Use utility classes for common patterns
5. Keep animations under 300ms
6. Test in light and dark modes

### Add Dark Mode Support
1. All colors already support dark mode via CSS variables
2. No additional code needed!
3. Test your component in both themes
4. Use `@media (prefers-color-scheme: dark)` if needed

---

## 📐 Grid & Layout

### Standard Layout Pattern
```scss
.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6);
  
  @media (max-width: 768px) {
    padding: var(--space-4);
  }
  
  @media (max-width: 480px) {
    padding: var(--space-3);
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
  
  @media (max-width: 768px) {
    gap: var(--space-4);
  }
}
```

### Flex Patterns
```scss
// Center content
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Space between
.space-between {
  display: flex;
  justify-content: space-between;
}

// Responsive flex direction
.flex-responsive {
  display: flex;
  flex-direction: row;
  gap: var(--space-4);
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
}
```

---

## 🐛 Troubleshooting

### Theme not switching?
1. Check ThemeService is injected
2. Verify localStorage is enabled
3. Check browser console for errors
4. Ensure `data-theme` attribute is on `<html>`

### Inputs not styled correctly?
1. Verify `_inputs.scss` is imported in `styles.scss`
2. Check input has correct class names
3. Verify Material form field is wrapped correctly
4. Check responsive breakpoint styles

### Animations not playing?
1. Verify animation class is applied
2. Check animation duration isn't too short
3. Ensure element isn't hidden
4. Check z-index layering
5. Verify GPU acceleration with transform/opacity

### Dark mode colors wrong?
1. Check CSS variables have dark mode variants
2. Verify `[data-theme='dark']` selector is used
3. Check browser DevTools for computed styles
4. Ensure localStorage isn't stuck on old value

---

## 📚 File Locations

```
src/
├── styles/
│   ├── _tokens.scss           # Design variables
│   ├── _utilities.scss        # Utility classes
│   ├── _buttons.scss          # Button styles
│   ├── _inputs.scss           # Input styling
│   ├── _themes.scss           # Color themes
│   ├── _base.scss             # Global styles
│   └── styles.scss            # Main stylesheet
├── app/
│   ├── core/services/
│   │   └── theme.service.ts   # Theme management
│   ├── shared/components/
│   │   ├── theme-toggle/      # Theme toggle button
│   │   └── custom-input-component/
│   └── features/auth/pages/
│       └── login/             # Login page
```

---

## ✅ Checklist for New Features

- [ ] Colors use CSS variables
- [ ] Spacing uses `--space-*`
- [ ] Component is responsive (3 breakpoints)
- [ ] Dark mode is tested
- [ ] Icons are from Material
- [ ] Input height is 48px (or breakpoint-adjusted)
- [ ] Animations are smooth (<300ms)
- [ ] Focus states are visible
- [ ] Mobile viewport is tested
- [ ] No hard-coded colors or sizes

---

**Need help?** Check the detailed documentation in `UI_ENHANCEMENT_COMPLETE.md`
src/app/
├── core/                          # Singletons & infrastructure
│   ├── guards/                    # Route guards
│   ├── interceptors/              # HTTP interceptors
│   ├── services/                  # Core services
│   └── models/                    # Core interfaces
├── features/                      # Feature modules (lazy-loaded)
│   ├── auth/
│   │   ├── components/            # UI components
│   │   ├── pages/                 # Smart components
│   │   ├── services/              # Feature services
│   │   ├── models/                # Feature interfaces
│   │   └── auth.routes.ts         # Feature routing
│   └── dashboard/                 # Follow same pattern
├── shared/                        # Reusable
│   ├── components/                # UI components
│   ├── services/                  # Utility services
│   ├── pipes/                     # Custom pipes
│   ├── directives/                # Custom directives
│   ├── constants/                 # App constants
│   └── models/                    # Shared interfaces
├── layout/                        # Layout components (optional)
├── styles/                        # Global styles
├── app.ts                         # Root component
├── app.routes.ts                  # Main routing
└── app.config.ts                  # App configuration
```

---

## Common Tasks

### 📁 Create a New Component

```bash
# Navigate to feature
cd src/app/features/auth/components

# Create folder
mkdir my-new-component

# Create 4 files
# 1. my-new-component.ts
# 2. my-new-component.html
# 3. my-new-component.scss
# 4. my-new-component.spec.ts

# Update parent index.ts if in shared/
```

**Template - my-new-component.ts:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-new-component',
  templateUrl: './my-new-component.html',
  styleUrl: './my-new-component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class MyNewComponent {}
```

---

### 📋 Create a New Feature

```bash
# 1. Create feature folder
cd src/app/features
mkdir my-feature

# 2. Create structure
cd my-feature
mkdir components pages services models

# 3. Create files
# - my-feature.routes.ts
# - services/my-feature.service.ts
# - components/my-component/
# - pages/my-page/

# 4. Add to app.routes.ts:
```

**app.routes.ts:**
```typescript
{
  path: 'my-feature',
  loadChildren: () => import('./features/my-feature/my-feature.routes').then(m => m.myFeatureRoutes)
}
```

**my-feature.routes.ts:**
```typescript
import { Routes } from '@angular/router';

export const myFeatureRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/my-page/my-page').then(m => m.MyPage)
  }
];
```

---

### 🔧 Create a New Service

**Feature Service:**
```typescript
// src/app/features/auth/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Available app-wide
})
export class AuthService {
  constructor() {}
  
  // Your methods here
}
```

**Core Service:**
```typescript
// src/app/core/services/logger.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor() {}
  
  // Your methods here
}
```

---

### 🛣️ Add a Route Guard

```typescript
// src/app/core/guards/my.guard.ts

import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

export const myGuard: CanActivateFn = (route, state) => {
  // Your guard logic here
  return true; // or false to deny access
};

// Usage in route:
{
  path: 'admin',
  loadComponent: () => import('./admin').then(m => m.AdminComponent),
  canActivate: [myGuard]
}
```

---

### 📡 Add an HTTP Interceptor

```typescript
// src/app/core/interceptors/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Modify request here
  return next(req);
};

// Register in core.config.ts:
export function provideCoreServices(): any[] {
  return [
    provideHttpClient(withInterceptors([authInterceptor]))
  ];
}
```

---

### 📦 Export Shared Components

**shared/components/index.ts:**
```typescript
// Always export from here for clean imports
export * from './custom-input-component/custom-input';
export * from './custom-button/custom-button';
export * from './custom-modal/custom-modal';
```

**Usage in features:**
```typescript
import { CustomInput, CustomButton } from '@shared/components';
// Instead of:
// import { CustomInput } from '@shared/components/custom-input-component/custom-input';
```

---

## Import Path Conventions

### ✅ DO

```typescript
// Shared components
import { CustomInput } from '@shared/components';

// Feature services
import { AuthService } from './services/auth.service';

// Core services
import { LoggerService } from '@core/services/logger.service';

// Feature models
import type { IUser } from '../models/user.model';
```

### ❌ DON'T

```typescript
// Deep nested imports
import { CustomInput } from '../../../../shared/components/custom-input-component/custom-input/custom-input';

// Circular dependencies
import { Feature1 } from '@features/feature1'; // in feature2

// Relative paths with many ..
import { MyService } from '../../../../../../../services/my.service';
```

---

## File Naming Conventions

### Components
```
my-component/
├── my-component.ts              ✅ Component class
├── my-component.html            ✅ Template
├── my-component.scss            ✅ Styles
└── my-component.spec.ts         ✅ Tests
```

### Services
```
my-feature/services/
└── my-service.ts                ✅ Always singular

// NOT: my-service.service.ts or MyService.service.ts
```

### Routes
```
my-feature/
└── my-feature.routes.ts         ✅ Feature routes

// NOT: my-feature-routing.module.ts
```

### Models/Interfaces
```
shared/models/
├── user.model.ts                ✅ Type definitions
├── auth.model.ts
└── index.ts
```

---

## Useful Commands

```bash
# Build and verify
ng build

# Run tests
ng test

# Lint code
ng lint

# Serve development
ng serve

# Generate component (optional tool)
ng generate component features/auth/components/my-component

# Generate service
ng generate service features/auth/services/my-service

# Generate guard
ng generate guard core/guards/my-guard
```

---

## Common Import Paths

```typescript
// Core module
import { AuthGuard } from '@core/guards/auth.guard';
import { LoggerService } from '@core/services/logger.service';
import type { IAppConfig } from '@core/models/app-config';

// Feature modules (relative imports within feature)
import { AuthService } from './services/auth.service';
import type { IUser } from './models/user.model';

// Shared
import { CustomInput, CustomButton } from '@shared/components';
import { CustomToasterService } from '@shared/services/custom-toaster.service/custom-toaster';
import { MATERIAL_IMPORTS } from '@shared/constants/material-imports';

// Angular
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
```

---

## Quick Checklist for New Components

- [ ] Folder created with component name (no double nesting)
- [ ] 4 files created: ts, html, scss, spec.ts
- [ ] Component is standalone: `standalone: true`
- [ ] Selector uses 'app-' prefix
- [ ] All imports in imports array
- [ ] Service injections use `inject()`
- [ ] @Input/@Output/@Model used correctly
- [ ] Exported from index.ts (if shared)
- [ ] Tests updated/created
- [ ] Styles scoped properly

---

## Component Template Examples

### Smart Component (Page)
```typescript
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  standalone: true,
  imports: [CommonModule, LoginForm, MatCardModule]
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  onLoginSuccess(): void {
    this.router.navigate(['/dashboard']);
  }
}
```

### Dumb Component (Presentational)
```typescript
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  standalone: true,
  imports: [FormsModule, CustomInput]
})
export class LoginForm {
  email = signal('');
  @Output() login = new EventEmitter<{email: string}>();
  
  onSubmit(): void {
    this.login.emit({ email: this.email() });
  }
}
```

---

## Troubleshooting

### "Cannot find module" Error
→ Check import path relative to current file location
→ Verify file/folder name matches exactly (case-sensitive)
→ Check barrel exports in index.ts

### "Selector already in use"
→ Ensure all components use unique 'app-xxx' selectors
→ Check for component name conflicts

### "Service not found"
→ Verify service has `providedIn: 'root'`
→ Check injection is done with `inject()` not constructor
→ Verify service is imported from correct path

### Build fails with import errors
→ Run: `ng build --configuration development`
→ Check all relative paths are correct
→ Verify no circular dependencies

---

## Resources

- 📖 [ARCHITECTURE.md](./ARCHITECTURE.md) - Complete guide
- 📋 [COMPONENT_VERIFICATION.md](./COMPONENT_VERIFICATION.md) - Component details
- 🔄 [STRUCTURE_TRANSFORMATION.md](./STRUCTURE_TRANSFORMATION.md) - Before/after
- 📊 [RESTRUCTURING_SUMMARY.md](./RESTRUCTURING_SUMMARY.md) - Executive summary

---

Last Updated: January 28, 2026

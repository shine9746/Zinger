# Quick Reference Guide

## Folder Structure At-a-Glance

```
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

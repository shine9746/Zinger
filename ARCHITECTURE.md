# Angular Application Architecture Documentation

## Overview
This document outlines the project structure following Angular best practices and industry standards.

---

## 📁 Folder Structure

```
src/app/
├── core/                           # Singleton services, guards, interceptors
│   ├── guards/                     # Route protection guards
│   │   └── auth.guard.ts
│   ├── interceptors/               # HTTP interceptors
│   ├── services/                   # Core-level services
│   ├── models/                     # Core-level interfaces/models
│   └── core.config.ts              # Core module configuration
│
├── features/                       # Feature modules (lazy-loadable)
│   ├── auth/
│   │   ├── components/             # Dumb/presentational components
│   │   │   ├── login-form/         # Single component per folder
│   │   │   │   ├── login-form.ts
│   │   │   │   ├── login-form.html
│   │   │   │   ├── login-form.scss
│   │   │   │   └── login-form.spec.ts
│   │   │   └── registration-form/
│   │   │       ├── registration-form.ts
│   │   │       ├── registration-form.html
│   │   │       ├── registration-form.scss
│   │   │       └── registration-form.spec.ts
│   │   │
│   │   ├── pages/                  # Smart/container components
│   │   │   ├── login-page/
│   │   │   └── registration-page/
│   │   │
│   │   ├── services/               # Feature-specific services
│   │   │   └── auth.service.ts
│   │   │
│   │   ├── models/                 # Feature-specific interfaces
│   │   │   └── auth.models.ts
│   │   │
│   │   └── auth.routes.ts          # Feature routing
│   │
│   └── dashboard/
│       ├── components/
│       ├── pages/
│       └── dashboard.routes.ts
│
├── shared/                         # Reusable across features
│   ├── components/                 # Shared UI components
│   │   ├── custom-input-component/
│   │   │   ├── custom-input.ts
│   │   │   ├── custom-input.html
│   │   │   ├── custom-input.scss
│   │   │   └── custom-input.spec.ts
│   │   ├── custom-date-picker/
│   │   ├── custom-radio/
│   │   ├── custom-toaster/
│   │   └── index.ts                # Barrel export
│   │
│   ├── services/                   # Shared utilities
│   │   └── custom-toaster.service/
│   │       ├── custom-toaster.ts
│   │       └── custom-toaster.spec.ts
│   │
│   ├── constants/                  # Shared constants
│   │   ├── material-imports.ts
│   │   └── index.ts
│   │
│   ├── models/                     # Shared interfaces
│   │   ├── common-interface.ts
│   │   └── index.ts
│   │
│   └── shared-module.ts            # Deprecated - use standalone components
│
├── styles/                         # Global styles
│   ├── _base.scss
│   ├── _buttons.scss
│   ├── _material-overrides.scss
│   ├── _themes.scss
│   ├── _tokens.scss
│   ├── _utilities.scss
│   ├── material-theme.scss
│   └── styles.scss
│
├── app.ts                          # Root component
├── app.html                        # Root template
├── app.scss                        # Root styles
├── app.routes.ts                   # Main routing
└── app.config.ts                   # Main app configuration
```

---

## 🎯 Architecture Principles

### 1. **Folder Structure Best Practices**

#### ✅ ONE Component Per Folder
- **Good**: `src/app/shared/components/custom-input/`
- **Bad**: `src/app/shared/components/custom-input/custom-input/`

Each component should live directly in its own folder with only 4 files:
- `component-name.ts` - Component class
- `component-name.html` - Template
- `component-name.scss` - Styles
- `component-name.spec.ts` - Tests

#### ✅ Feature-Based Organization
Organize features by business domain, not technical concerns:
```
features/auth/          ✅ Good
  ├── components/
  ├── pages/
  ├── services/
  └── models/

features/auth/services/auth.service/  ❌ Bad
features/auth/guards/                 ❌ Avoid (use core/)
```

#### ✅ Separation of Concerns
- **pages/** - Smart/Container components that handle state and logic
- **components/** - Dumb/Presentational components that receive @Input/@Output
- **services/** - Business logic and API calls
- **models/** - TypeScript interfaces and types

### 2. **Module Organization**

#### Core Module
Provides singleton services used app-wide:
- Guards (route protection)
- Interceptors (HTTP handling)
- Services (authentication, logging, etc.)

**Key Rule**: Core services use `providedIn: 'root'` - never import CoreModule in features!

#### Feature Modules
Self-contained business units (auth, dashboard, etc.):
- Lazy-loadable
- Own components, services, models
- Can depend on Shared and Core
- Should NOT depend on other features

#### Shared Module
Reusable across all features:
- UI Components (custom inputs, modals, etc.)
- Pipes and Directives
- Utility Services
- Constants and Models

### 3. **Import Paths**

#### Barrel Exports (index.ts)
Create barrel exports for cleaner imports:

```typescript
// ✅ shared/components/index.ts
export * from './custom-input-component/custom-input';
export * from './custom-date-picker/custom-date-picker';
export * from './custom-radio/custom-radio';

// Usage in components:
import { CustomInput, CustomDatePicker } from '@shared/components';
```

#### Avoid Circular Dependencies
```typescript
// ❌ Bad
// feature-a imports from feature-b and vice versa

// ✅ Good
// Both features import from shared
// Shared does not import from features
```

### 4. **Component Structure**

#### Smart Component (Page/Container)
```typescript
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  standalone: true,
  imports: [CommonModule, LoginForm]
})
export class LoginPage {
  // Handles state, routing, service calls
  // Passes data to dumb components via @Input/@Output
}
```

#### Dumb Component (Presentational)
```typescript
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  standalone: true,
  imports: [FormsModule, CustomInput]
})
export class LoginForm {
  // Pure presentation logic
  // Receives data via @Input
  // Emits user actions via @Output
  // No service injections (except rare cases)
}
```

### 5. **Lazy Loading**

Routes should lazy-load features:
```typescript
// ✅ app.routes.ts
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  }
];

// ✅ auth.routes.ts
export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login-page/login-page').then(m => m.LoginPage)
  }
];
```

---

## 📋 Component Inventory

### Auth Feature Components

| Component | Type | Purpose |
|-----------|------|---------|
| LoginPage | Smart | Login page container |
| LoginForm | Dumb | Login form presentation |
| RegistrationPage | Smart | Registration page container |
| RegistrationForm | Dumb | Registration form presentation |

**Status**: ✅ **COMPLIANT** - Properly flattened folder structure

**Service**: `AuthService` (src/app/features/auth/services/auth.service.ts)
- Handles user authentication
- Manages user session
- Provides login/logout/register methods

---

### Shared Components

| Component | Location | Purpose |
|-----------|----------|---------|
| CustomInput | shared/components/custom-input-component/ | Custom input field |
| CustomDatePicker | shared/components/custom-date-picker/ | Date selection |
| CustomRadio | shared/components/custom-radio/ | Radio button group |
| CustomToaster | shared/components/custom-toaster/ | Toast notifications |

**Status**: ✅ **COMPLIANT** - Proper single-component-per-folder structure

**Service**: `CustomToasterService` (shared/services/custom-toaster.service/)
- Toast notification management

---

## 🔧 Services Architecture

### Core Services (Root Level)
- **AuthService** (feature: auth) - User authentication
- **LoggerService** - Application logging
- **ErrorHandlerService** - Global error handling

### Feature Services
- Feature-specific business logic
- Example: Auth feature has AuthService

### Shared Services
- Generic utilities used across features
- Example: CustomToasterService

---

## ✅ Compliance Checklist

- [x] No double nesting in component folders
- [x] Core module with guards and interceptors structure
- [x] Feature-based folder organization
- [x] Shared module for reusables
- [x] Barrel exports in shared/components/index.ts
- [x] Proper lazy-loaded routing
- [x] Smart/dumb component separation
- [x] Feature services in feature/services folder
- [x] Standalone components (no deprecated NgModule)

---

## 📚 Migration Notes

### Changes Made:
1. ✅ Flattened component folders (removed double nesting)
2. ✅ Created core module structure with guards
3. ✅ Created AuthService with proper methods
4. ✅ Updated all import paths to new structure
5. ✅ Added proper barrel exports
6. ✅ Created auth.routes.ts for feature routing

### Files Modified:
- `src/app/features/auth/components/login-form/login-form.ts` - Import paths
- `src/app/features/auth/pages/login/login-page/login-page.ts` - Import paths
- `src/app/shared/components/index.ts` - Barrel exports

### Files Created:
- `src/app/core/core.config.ts`
- `src/app/core/guards/auth.guard.ts`
- `src/app/features/auth/services/auth.service.ts`
- `src/app/features/auth/auth.routes.ts`

---

## 🚀 Next Steps

1. **Create HTTP Interceptors** in `core/interceptors/`
2. **Implement AuthGuard** with actual auth state checks
3. **Add Dashboard Feature** following same structure
4. **Create Error Handling** interceptor
5. **Add Unit Tests** for all services
6. **Implement State Management** (if needed - consider NgRx/Akita)

---

## 📖 References

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Feature Module Best Practices](https://angular.io/guide/feature-modules)
- [Standalone Components](https://angular.io/guide/standalone-components)
- [Lazy Loading Routes](https://angular.io/guide/lazy-loading-ngmodules)


# Implementation Examples - Food Delivery App UI Components

## Quick Start Guide

### 1. Update Login Page with Brand Colors

**File**: `src/app/features/auth/pages/login/login.html`

```html
<div class="login-container min-h-screen flex items-center justify-center bg-surface">
  <mat-card class="login-card shadow-lg rounded-xl p-8 max-w-md w-full mx-4">
    <!-- Logo/Branding -->
    <div class="text-center mb-8">
      <div class="w-16 h-16 mx-auto mb-4 bg-brand rounded-full flex items-center justify-center">
        <mat-icon class="text-3xl text-white">restaurant_menu</mat-icon>
      </div>
      <h1 class="text-3xl font-bold text-brand mb-2">FoodHub</h1>
      <p class="text-tertiary text-sm">Fast, Fresh, Delivered</p>
    </div>

    <!-- Welcome Text -->
    <div class="mb-6 text-center">
      <mat-card-title class="text-2xl mb-2">Welcome Back</mat-card-title>
      <mat-card-subtitle class="text-secondary">Sign in to your account</mat-card-subtitle>
    </div>

    <!-- Form -->
    <app-login-form (click)="login()"></app-login-form>

    <!-- Divider -->
    <div class="flex items-center gap-3 my-6">
      <div class="flex-1 border-t border-divider"></div>
      <span class="text-tertiary text-sm">Don't have an account?</span>
      <div class="flex-1 border-t border-divider"></div>
    </div>

    <!-- Register Button -->
    <button 
      mat-button 
      class="btn-outline btn-full py-3 rounded-lg"
      (click)="register()">
      Create New Account
    </button>
  </mat-card>
</div>
```

**File**: `src/app/features/auth/pages/login/login.scss`

```scss
.login-container {
  min-height: 100vh;
  padding: var(--space-4);
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg) 100%);
}

.login-card {
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-xl);
  }
}

// Add smooth animation on load
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-card {
  animation: slideInUp 500ms ease-out;
}
```

### 2. Update Login Form Component

**File**: `src/app/features/auth/components/login-form/login-form.html`

```html
<form [formGroup]="form" (ngSubmit)="login()" class="space-y-4">
  <!-- Email Input -->
  <mat-form-field appearance="outline" class="w-full">
    <mat-label>Email Address</mat-label>
    <input 
      matInput 
      type="email" 
      formControlName="email"
      placeholder="you@example.com"
      required>
    <mat-icon matSuffix class="text-primary">email</mat-icon>
    <mat-error *ngIf="form.get('email')?.hasError('required')">
      Email is required
    </mat-error>
    <mat-error *ngIf="form.get('email')?.hasError('email')">
      Please enter a valid email
    </mat-error>
  </mat-form-field>

  <!-- Password Input -->
  <mat-form-field appearance="outline" class="w-full">
    <mat-label>Password</mat-label>
    <input 
      matInput 
      [type]="hidePassword ? 'password' : 'text'" 
      formControlName="password"
      placeholder="••••••••"
      required>
    <button 
      mat-icon-button 
      matSuffix 
      (click)="hidePassword = !hidePassword" 
      [attr.aria-label]="'Hide password'" 
      [attr.aria-pressed]="hidePassword"
      type="button">
      <mat-icon class="text-primary">{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
    </button>
    <mat-error *ngIf="form.get('password')?.hasError('required')">
      Password is required
    </mat-error>
  </mat-form-field>

  <!-- Remember Me & Forgot Password -->
  <div class="flex items-center justify-between mb-2">
    <mat-checkbox formControlName="remember" class="text-sm">
      Remember me
    </mat-checkbox>
    <a href="#" class="text-sm text-primary hover:text-primary-dark transition-base">
      Forgot Password?
    </a>
  </div>

  <!-- Error Alert -->
  <div 
    *ngIf="error" 
    class="bg-danger text-white rounded-lg p-4 flex items-center gap-3 mb-4 shadow-sm">
    <mat-icon>error</mat-icon>
    <span class="text-sm">{{ error }}</span>
  </div>

  <!-- Login Button -->
  <button 
    type="submit" 
    class="btn-primary btn-full py-3 rounded-lg font-semibold shadow-md"
    [disabled]="!form.valid || isLoading">
    <mat-spinner *ngIf="isLoading" diameter="20" class="mr-2"></mat-spinner>
    {{ isLoading ? 'Signing In...' : 'Sign In' }}
  </button>

  <!-- Security Badge -->
  <div class="text-center mt-4">
    <p class="text-tertiary text-xs flex items-center justify-center gap-1">
      <mat-icon class="text-sm">lock</mat-icon>
      Your data is secure and encrypted
    </p>
  </div>
</form>
```

### 3. Restaurant Card Component

**File**: `src/app/shared/components/restaurant-card/restaurant-card.html`

```html
<mat-card 
  class="restaurant-card shadow-sm hover:shadow-lg transition-base cursor-pointer rounded-xl overflow-hidden border border-border group">
  
  <!-- Image Container -->
  <div class="relative overflow-hidden bg-surface">
    <img 
      [src]="restaurant.image" 
      [alt]="restaurant.name"
      class="w-full h-40 object-cover group-hover:scale-105 transition-base">
    
    <!-- Rating Badge -->
    <div class="absolute top-3 right-3 bg-primary text-white rounded-full px-2 py-1 text-xs font-semibold shadow-md flex items-center gap-1">
      <mat-icon class="text-sm">star</mat-icon>
      {{ restaurant.rating }}
    </div>

    <!-- Promotion Badge -->
    <div 
      *ngIf="restaurant.promotion" 
      class="absolute top-3 left-3 bg-cancel text-white rounded-lg px-3 py-1 text-xs font-semibold shadow-md">
      {{ restaurant.promotion }}
    </div>

    <!-- Delivery Badge -->
    <div class="absolute bottom-3 left-3 bg-neutral-900 bg-opacity-75 text-white rounded-lg px-3 py-1 text-xs font-semibold">
      🚚 {{ restaurant.deliveryTime }} min
    </div>
  </div>

  <!-- Content -->
  <div class="p-4">
    <!-- Restaurant Name -->
    <h3 class="text-lg font-bold text-text mb-1 truncate">
      {{ restaurant.name }}
    </h3>

    <!-- Category & Rating -->
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm text-secondary truncate">{{ restaurant.category }}</span>
      <div class="flex items-center gap-1 text-xs text-tertiary">
        <mat-icon class="text-sm">location_on</mat-icon>
        {{ restaurant.distance }}km
      </div>
    </div>

    <!-- Pricing & Delivery Info -->
    <div class="flex items-center justify-between">
      <span class="text-sm font-semibold text-text">
        ${{ restaurant.minOrder }}-${{ restaurant.maxPrice }}
      </span>
      <span class="text-xs text-secondary">
        {{ restaurant.deliveryFee }} delivery
      </span>
    </div>
  </div>

  <!-- Hover Action -->
  <div class="px-4 pb-4 pt-0">
    <button class="btn-primary btn-full py-2 rounded-lg text-sm font-semibold">
      View Menu
    </button>
  </div>
</mat-card>
```

**File**: `src/app/shared/components/restaurant-card/restaurant-card.scss`

```scss
.restaurant-card {
  transition: all var(--transition-base);
  
  &:hover {
    transform: translateY(-4px);
  }

  img {
    transition: transform var(--transition-base);
  }

  &:hover img {
    transform: scale(1.05);
  }
}
```

### 4. Order Status Timeline

**File**: `src/app/features/order/components/order-timeline/order-timeline.html`

```html
<div class="order-timeline">
  <ng-container *ngFor="let step of steps; let last = last">
    <!-- Timeline Item -->
    <div class="timeline-item" [class.completed]="step.completed">
      <!-- Timeline Dot -->
      <div class="timeline-dot" [class.active]="step.active" [class.completed]="step.completed">
        <mat-icon *ngIf="step.completed" class="text-success">check_circle</mat-icon>
        <mat-icon *ngIf="!step.completed && step.active" class="text-primary">schedule</mat-icon>
        <mat-icon *ngIf="!step.completed && !step.active" class="text-neutral-300">radio_button_unchecked</mat-icon>
      </div>

      <!-- Timeline Line (except last) -->
      <div *ngIf="!last" class="timeline-line" [class.completed]="step.completed"></div>

      <!-- Step Content -->
      <div class="timeline-content ml-6">
        <h4 class="font-semibold" [class.text-success]="step.completed" [class.text-primary]="step.active">
          {{ step.title }}
        </h4>
        <p class="text-sm text-secondary mt-1">{{ step.description }}</p>
        <p class="text-xs text-tertiary mt-2" *ngIf="step.time">
          {{ step.time | date: 'short' }}
        </p>
      </div>
    </div>
  </ng-container>
</div>
```

**File**: `src/app/features/order/components/order-timeline/order-timeline.scss`

```scss
.order-timeline {
  position: relative;
  padding: var(--space-4) 0;
}

.timeline-item {
  display: flex;
  margin-bottom: var(--space-6);
  position: relative;

  &.completed {
    .timeline-dot {
      background-color: var(--color-success);
    }
  }
}

.timeline-dot {
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  transition: all var(--transition-base);

  &.active {
    background-color: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  &.completed {
    background-color: var(--color-success);
    color: white;
    border-color: var(--color-success);
  }

  mat-icon {
    font-size: 20px;
    width: 20px;
    height: 20px;
  }
}

.timeline-line {
  position: absolute;
  left: 19px;
  top: 40px;
  width: 2px;
  height: 66px;
  background-color: var(--color-border);
  transition: all var(--transition-base);

  &.completed {
    background-color: var(--color-success);
  }
}

.timeline-content {
  padding-top: var(--space-1);
}
```

### 5. Quick Action Buttons Pattern

```html
<!-- Delivery Status Actions -->
<div class="flex gap-2 mt-6 pt-6 border-t border-divider">
  <!-- Track Order (Secondary) -->
  <button class="btn-outline btn-lg flex-1 rounded-lg">
    <mat-icon>map</mat-icon>
    Track Order
  </button>

  <!-- Cancel Order (Text) -->
  <button class="btn-text btn-lg rounded-lg">
    <mat-icon>close</mat-icon>
    Cancel
  </button>

  <!-- Contact Driver (Primary) -->
  <button class="btn-primary btn-lg flex-1 rounded-lg">
    <mat-icon>phone</mat-icon>
    Call Driver
  </button>
</div>
```

### 6. Rating & Review Component

```html
<div class="rating-section bg-surface rounded-xl p-6 shadow-sm">
  <h3 class="text-lg font-bold mb-4">Rate Your Experience</h3>

  <!-- Star Rating -->
  <div class="flex gap-3 mb-6 justify-center">
    <button 
      *ngFor="let i of [1,2,3,4,5]"
      class="text-4xl transition-base"
      [class.text-warning]="selectedRating >= i"
      [class.text-neutral-300]="selectedRating < i"
      (click)="selectedRating = i">
      ★
    </button>
  </div>

  <!-- Review Text -->
  <mat-form-field appearance="outline" class="w-full mb-4">
    <mat-label>Share your feedback</mat-label>
    <textarea 
      matInput 
      placeholder="How was your order? Tell us your thoughts..."
      rows="4"
      [(ngModel)]="reviewText">
    </textarea>
  </mat-form-field>

  <!-- Submit Button -->
  <button class="btn-primary btn-full rounded-lg font-semibold">
    Submit Review
  </button>
</div>
```

### 7. Alert/Notification Patterns

```html
<!-- Success Alert -->
<div class="bg-success text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-md mb-4">
  <mat-icon>check_circle</mat-icon>
  <span>Order placed successfully! Estimated delivery in 30 minutes.</span>
  <button mat-icon-button (click)="closeAlert()">
    <mat-icon>close</mat-icon>
  </button>
</div>

<!-- Error Alert -->
<div class="bg-danger text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-md mb-4">
  <mat-icon>error</mat-icon>
  <span>Payment failed. Please check your card and try again.</span>
  <button mat-icon-button (click)="closeAlert()">
    <mat-icon>close</mat-icon>
  </button>
</div>

<!-- Warning Alert -->
<div class="bg-warning text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-md mb-4">
  <mat-icon>warning</mat-icon>
  <span>This restaurant is currently busy. Delivery may take longer.</span>
</div>

<!-- Info Alert -->
<div class="bg-info text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-md mb-4">
  <mat-icon>info</mat-icon>
  <span>Your order is being prepared by the restaurant.</span>
</div>
```

---

## Implementation Checklist

- [ ] Update all button styles to use new color system
- [ ] Implement shadow system across cards and elevated elements
- [ ] Add brand color (mustard) to logo and header
- [ ] Update form fields with consistent styling
- [ ] Implement dark mode theme switcher
- [ ] Add accessibility focus states
- [ ] Test color contrast ratios (WCAG AA)
- [ ] Update Material component overrides
- [ ] Implement loading and empty states
- [ ] Add smooth transitions and animations
- [ ] Test on mobile devices (touch targets 44x44px minimum)
- [ ] Validate with accessibility inspector

---

**Last Updated**: January 28, 2026

# Food Delivery App - Design System & Style Guide

## Brand Colors & Palette

### Primary Brand Color: Mustard/Gold
Used for brand identity and key visual elements
- **Base**: `#d4a574` (Warm mustard)
- **Light**: `#e8c4a0` (Subtle backgrounds)
- **Dark**: `#9d7c51` (Borders, shadows)

### Action Colors

#### Primary Action: Green
Used for confirm, submit, and positive actions
- **Base**: `#22c55e` (Action green)
- **Light**: `#4ade80` (Hover states)
- **Dark**: `#16a34a` (Active states)

#### Cancel/Destructive: Red
Used for delete, cancel, and negative actions
- **Base**: `#ef4444` (Cancel red)
- **Light**: `#f87171` (Hover states)
- **Dark**: `#dc2626` (Active states)

#### Secondary Action: Amber
Used for secondary or warning actions
- **Base**: `#f59e0b` (Amber)
- **Light**: `#fbbf24` (Hover states)
- **Dark**: `#d97706` (Active states)

### Semantic Status Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `#10b981` | Order confirmed, payment successful |
| Warning | `#f97316` | Pending, needs attention |
| Danger | `#ef4444` | Errors, failures |
| Info | `#3b82f6` | Information, tips |

### Neutral Colors

- **900**: `#111827` (Text - darkest)
- **800**: `#1f2937` (Text)
- **700**: `#374151` (Text - secondary)
- **600**: `#4b5563` (Text - light)
- **500**: `#6b7280` (Borders)
- **400**: `#9ca3af` (Borders - light)
- **300**: `#d1d5db` (Borders - lighter)
- **200**: `#e5e7eb` (Dividers)
- **100**: `#f3f4f6` (Surfaces)
- **50**: `#f9fafb` (Backgrounds)

## Typography

### Font Families
- **Base**: Roboto (Standard UI text)
- **Alternative**: Inter (Headings, emphasis)
- **Monospace**: Roboto Mono (Code)

### Font Sizes
| Class | Size | Usage |
|-------|------|-------|
| `text-xs` | 11px | Helper text, captions |
| `text-sm` | 12px | Small labels, badges |
| `text-base` | 14px | Body text (default) |
| `text-md` | 16px | Larger body text |
| `text-lg` | 18px | Subheadings |
| `text-xl` | 20px | Headings |
| `text-2xl` | 24px | Large headings |
| `text-3xl` | 30px | Page titles |

### Font Weights
- Regular: 400 (Body text)
- Medium: 500 (Buttons, emphasis)
- Semibold: 600 (Subheadings)
- Bold: 700 (Headings)

## Spacing System

All spacing uses a consistent 4px base unit:

| Class | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | Reset |
| `space-1` | 4px | Minimal spacing |
| `space-2` | 8px | Tight spacing |
| `space-3` | 12px | Compact |
| `space-4` | 16px | Standard |
| `space-5` | 20px | Comfortable |
| `space-6` | 24px | Relaxed |
| `space-8` | 32px | Large |
| `space-12` | 48px | Extra large |

### Usage Example
```html
<div class="p-6 mb-4">Content here</div>
<!-- padding: 24px, margin-bottom: 16px -->
```

## Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-xs` | 2px | Minimal curves |
| `rounded-sm` | 4px | Inputs, small elements |
| `rounded-md` | 8px | Cards, modals |
| `rounded-lg` | 12px | Buttons, containers |
| `rounded-xl` | 16px | Large containers |
| `rounded-2xl` | 20px | Feature sections |
| `rounded-full` | 999px | Circles, pills |

## Shadows (Elevation System)

| Class | Usage |
|-------|-------|
| `shadow-xs` | Subtle elevation |
| `shadow-sm` | Slight lift (inputs, hover states) |
| `shadow-md` | Card elevation (default) |
| `shadow-lg` | Modal, floating elements |
| `shadow-xl` | Prominent elevation |
| `shadow-2xl` | Maximum elevation |
| `shadow-inner` | Inset shadow effect |

## Button Styles

### Primary Button (Green)
```html
<button class="btn-primary">Confirm Order</button>
```
- Background: `#22c55e`
- Hover: `#16a34a`
- Used for: Confirm, submit, proceed actions

### Cancel Button (Red)
```html
<button class="btn-cancel">Cancel Order</button>
```
- Background: `#ef4444`
- Hover: `#dc2626`
- Used for: Cancel, delete, reject actions

### Secondary Button (Amber)
```html
<button class="btn-secondary">View More</button>
```
- Background: `#f59e0b`
- Hover: `#d97706`
- Used for: Secondary actions

### Outline Button
```html
<button class="btn-outline">Maybe Later</button>
```
- Border: `#22c55e`
- Background: Transparent
- Used for: Optional, less important actions

### Text Button
```html
<button class="btn-text">Learn More</button>
```
- Color: `#22c55e`
- Background: Transparent
- Used for: Minimal, inline actions

### Button Sizes
```html
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary">Default</button>
<button class="btn-primary btn-lg">Large</button>
<button class="btn-primary btn-full">Full Width</button>
```

## Component Patterns

### Card Component
```html
<mat-card class="shadow-md rounded-lg p-6">
  <mat-card-title>Order Details</mat-card-title>
  <mat-card-subtitle>Order #12345</mat-card-subtitle>
  <!-- Content -->
</mat-card>
```

### Form Field with Validation
```html
<mat-form-field appearance="outline">
  <mat-label>Email Address</mat-label>
  <input matInput required [formControl]="emailControl">
  <mat-error *ngIf="emailControl.hasError('required')">
    Email is required
  </mat-error>
</mat-form-field>
```

### Alert/Notification
```html
<!-- Success -->
<div class="bg-success text-white rounded-lg p-4 shadow-md">
  Order placed successfully!
</div>

<!-- Error -->
<div class="bg-danger text-white rounded-lg p-4 shadow-md">
  Payment failed. Please try again.
</div>

<!-- Warning -->
<div class="bg-warning text-white rounded-lg p-4 shadow-md">
  Delivery may take longer than expected
</div>
```

### Badge Component
```html
<span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
  Verified
</span>
```

### Input Group
```html
<div class="flex gap-2">
  <input type="text" placeholder="Search food..." class="flex-1">
  <button class="btn-primary btn-icon">
    <mat-icon>search</mat-icon>
  </button>
</div>
```

## Layout Patterns

### Flex Layout Utilities
```html
<!-- Centered content -->
<div class="flex items-center justify-center h-screen">
  Content
</div>

<!-- Between spacing -->
<div class="flex justify-between items-center p-4">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Vertical layout -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Responsive Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="rounded-lg shadow-md p-6">Card 1</div>
  <div class="rounded-lg shadow-md p-6">Card 2</div>
  <div class="rounded-lg shadow-md p-6">Card 3</div>
</div>
```

## Transitions & Animations

| Variable | Value | Usage |
|----------|-------|-------|
| `transition-fast` | 150ms | Quick feedback |
| `transition-base` | 200ms | Standard transitions |
| `transition-slow` | 300ms | Smooth, noticed transitions |

### Usage
```css
.element {
  transition: all var(--transition-base);
}

.element:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

## Z-Index Scale

| Variable | Value | Usage |
|----------|-------|-------|
| `z-base` | 0 | Default |
| `z-dropdown` | 1000 | Dropdowns |
| `z-sticky` | 1020 | Sticky headers |
| `z-fixed` | 1030 | Fixed elements |
| `z-modal-backdrop` | 1040 | Modal backdrop |
| `z-modal` | 1050 | Modal dialogs |
| `z-popover` | 1060 | Popovers |
| `z-tooltip` | 1070 | Tooltips |

## Dark Mode Support

The app supports three themes:

### 1. Light Theme (Default)
```html
<html data-theme="light">
```

### 2. Dark Theme
```html
<html data-theme="dark">
```
- Adjusts all colors for dark backgrounds
- Maintains contrast ratios for accessibility

### 3. High Contrast Theme
```html
<html data-theme="high-contrast">
```
- Maximum contrast for accessibility
- Bold colors for visibility

## Accessibility Guidelines

1. **Color Contrast**: All text meets WCAG AA standards (4.5:1 for normal, 3:1 for large)
2. **Focus States**: All interactive elements have clear focus indicators
3. **Touch Targets**: Minimum 44x44px for interactive elements
4. **Semantic HTML**: Proper heading hierarchy and form labels
5. **ARIA Labels**: Used for screen readers on complex components

## Food Delivery Specific Patterns

### Order Status Badge
```html
<span class="badge badge-confirmed">Order Confirmed</span>
<span class="badge badge-pending">Preparing</span>
<span class="badge badge-delivering">On the way</span>
<span class="badge badge-completed">Delivered</span>
```

### Rating Component
```html
<div class="flex gap-1">
  <mat-icon class="text-warning">star</mat-icon>
  <mat-icon class="text-warning">star</mat-icon>
  <mat-icon class="text-warning">star</mat-icon>
  <mat-icon class="text-warning">star_half</mat-icon>
  <mat-icon class="text-neutral-400">star_outline</mat-icon>
  <span class="ml-2 text-sm text-secondary">4.5 (128 reviews)</span>
</div>
```

### Restaurant Card
```html
<mat-card class="shadow-md hover:shadow-lg transition-base cursor-pointer rounded-lg overflow-hidden">
  <img class="w-full h-48 object-cover" src="restaurant.jpg" alt="Restaurant">
  <div class="p-4">
    <h3 class="font-semibold text-lg">Restaurant Name</h3>
    <p class="text-secondary text-sm">Cuisine Type • 4.8 ⭐</p>
    <p class="text-tertiary text-sm mt-2">30-45 min • $3-5 delivery</p>
  </div>
</mat-card>
```

## Performance Considerations

1. **Transitions**: Use `transition-fast` for micro-interactions
2. **Animations**: Keep animations under 300ms for perceived performance
3. **Shadows**: Use `shadow-sm` for subtle effects to reduce paint time
4. **Colors**: CSS variables used for theme switching without repaints

## Code Examples

### Complete Button Group
```html
<div class="flex gap-2 mb-4">
  <button class="btn-primary flex-1">Confirm</button>
  <button class="btn-outline flex-1">Cancel</button>
</div>
```

### Form with Validation
```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <mat-form-field appearance="outline" class="w-full mb-4">
    <mat-label>Full Name</mat-label>
    <input matInput formControlName="name" required>
  </mat-form-field>

  <mat-form-field appearance="outline" class="w-full mb-6">
    <mat-label>Email</mat-label>
    <input matInput formControlName="email" type="email" required>
    <mat-error>Please enter a valid email</mat-error>
  </mat-form-field>

  <button type="submit" class="btn-primary btn-full">
    Continue
  </button>
</form>
```

## Testing Colors

Test your implementation with:
- Contrast checker: https://webaim.org/resources/contrastchecker/
- Color blind simulator: https://www.color-blindness.com/coblis-color-blindness-simulator/
- Accessibility inspector: Built-in browser DevTools

---

**Last Updated**: January 28, 2026
**Version**: 1.0
**Design System Author**: Food Delivery App Team

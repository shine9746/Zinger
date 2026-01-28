# 🎨 Design System Quick Reference

## Most Important Colors

### Action Buttons
```
✅ Confirm = Green     (#22c55e)
❌ Cancel  = Red       (#ef4444)
ℹ️  Info    = Amber     (#f59e0b)
```

### Brand & Text
```
🏪 Brand   = Mustard   (#d4a574)
📝 Text    = Dark Gray (#111827)
💬 Light   = Medium    (#4b5563)
```

---

## Copy-Paste HTML

### Green Button (Confirm)
```html
<button class="btn-primary rounded-lg">Confirm</button>
```

### Red Button (Cancel)
```html
<button class="btn-cancel rounded-lg">Cancel</button>
```

### Card
```html
<mat-card class="shadow-md p-6 rounded-lg">Content</mat-card>
```

### Alert (Success)
```html
<div class="bg-success text-white p-4 rounded-lg flex gap-3">
  <mat-icon>check</mat-icon>
  <span>Success message</span>
</div>
```

### Alert (Error)
```html
<div class="bg-danger text-white p-4 rounded-lg flex gap-3">
  <mat-icon>error</mat-icon>
  <span>Error message</span>
</div>
```

### Centered Page
```html
<div class="flex items-center justify-center min-h-screen">
  <div class="shadow-lg p-8 rounded-lg">Content</div>
</div>
```

---

## Most Used Classes

```
Buttons:    btn-primary | btn-cancel | btn-full | btn-lg
Spacing:    p-4 | p-6 | mb-4 | gap-4 | gap-6
Layout:     flex | items-center | justify-center | w-full
Styling:    rounded-lg | shadow-md | shadow-lg | border
Colors:     text-primary | text-secondary | bg-surface
```

---

## Theme Support

```html
<html data-theme="light">          <!-- Default -->
<html data-theme="dark">           <!-- Dark mode -->
<html data-theme="high-contrast">  <!-- Accessibility -->
```

---

## Documentation Files

| File | Purpose |
|------|---------|
| DESIGN_SYSTEM.md | Complete reference (400+ lines) |
| IMPLEMENTATION_GUIDE.md | Code examples (500+ lines) |
| COLOR_PALETTE.md | All color values (300+ lines) |
| COMPLETION_CHECKLIST.md | What was built |
| STYLE_SYSTEM_COMPLETE.md | Summary |

---

**Status**: ✅ READY TO USE  
**Last Updated**: January 28, 2026

# 📚 Style Guide

## 🎨 Design System

### 🎨 Color Palette

| Category | Variable | Value | Description |
|-----------|----------|--------|-----------|
| **Brand Colors** | Primary Green | `#4CAF50` | Main brand color |
| | Secondary Green | `#45a049` | Secondary color for hover |
| **Light Theme** | Background | `#e8eaed` | Main background |
| | Secondary Background | `#f0f2f5` | Element background |
| | Text | `#2c3e50` | Main text |
| | Secondary Text | `#546e7a` | Support text |
| | Border | `#d1d5db` | Borders and dividers |
| **Dark Theme** | Background | `#000000` | Main background |
| | Secondary Background | `#1a1a1a` | Element background |
| | Text | `#ffffff` | Main text |
| | Secondary Text | `#cccccc` | Support text |
| | Border | `#333333` | Borders and dividers |

### 🎯 Interactive Elements

#### Buttons and Links

| State | Property | Value |
|--------|-------------|-------|
| **Normal** | Border | `1px solid` |
| | Border Radius | `8px` |
| | Padding | `0.75rem 1rem` |
| | Transition | `all 0.3s ease` |
| **Hover** | Elevation | `translateY(-2px)` |
| | Shadow | `0 3px 6px rgba(0, 0, 0, 0.15)` |
| | Text Color | Primary Green |
| **Active** | Elevation | `translateY(0)` |
| | Shadow | `0 2px 4px rgba(0, 0, 0, 0.1)` |
| **Focus** | Border | Green gradient |
| | Outline | None |

### 📏 Typography

| Element | Font | Weight | Size | Line Height |
|----------|-------|------|---------|-----------------|
| H1 Headings | Inter | 700 | `2rem` | `2.5rem` |
| H2 Headings | Inter | 600 | `1.5rem` | `2rem` |
| H3 Headings | Inter | 600 | `1.25rem` | `1.75rem` |
| Body Text | Inter | 400 | `1rem` | `1.5rem` |
| Small Text | Inter | 400 | `0.875rem` | `1.25rem` |

### 📱 Responsiveness

| Breakpoint | Value | Description |
|------------|-------|-----------|
| Mobile | `< 768px` | Mobile devices |
| Tablet | `768px - 1024px` | Tablets and iPads |
| Desktop | `> 1024px` | Desktops and laptops |

#### Mobile Adjustments
- Reduced padding: `0.5rem 0.75rem`
- Touch targets: minimum `44px`
- Base font size: `14px`
- Menu: hamburger navigation
- Grid: single column

### 🎭 Themes

#### Light Theme
```css
{
  background: #e8eaed;
  color: #2c3e50;
  borderColor: #d1d5db;
  shadowColor: rgba(0, 0, 0, 0.1);
}
```

#### Dark Theme
```css
{
  background: #000000;
  color: #ffffff;
  borderColor: #333333;
  shadowColor: rgba(0, 0, 0, 0.2);
}
```

### ♿ Accessibility

#### Contrast
- Normal text: minimum 4.5:1
- Large text: minimum 3:1
- Interactive elements: minimum 3:1

#### Focus
- Visible on all interactive elements
- Highlighted outline or border
- Not relying on color alone

#### Interaction
- Touch targets minimum 44x44px
- Labels on all forms
- Clear error messages
- Keyboard navigation support

### 🔄 Animations

| Element | Duration | Timing | Properties |
|----------|----------|---------|--------------|
| Buttons | `300ms` | `ease` | transform, color |
| Menus | `200ms` | `ease-in-out` | opacity, transform |
| Modals | `250ms` | `ease-out` | opacity, transform |
| Tooltips | `150ms` | `ease` | opacity |

### 📦 Components

#### Buttons
```css
.button {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
}
```

#### Cards
```css
.card {
  padding: 1rem;
  border-radius: 8px;
  background: var(--background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}
```

#### Inputs
```css
.input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
}
```

### 🛠️ Utilities

#### Spacing
| Class | Value | Usage |
|--------|-------|-----|
| `.gap-1` | `0.25rem` | Minimum spacing |
| `.gap-2` | `0.5rem` | Small spacing |
| `.gap-3` | `0.75rem` | Medium spacing |
| `.gap-4` | `1rem` | Default spacing |
| `.gap-5` | `1.5rem` | Large spacing |

#### Shadows
| Class | Value | Usage |
|--------|-------|-----|
| `.shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle shadow |
| `.shadow` | `0 2px 4px rgba(0,0,0,0.1)` | Default shadow |
| `.shadow-lg` | `0 4px 6px rgba(0,0,0,0.15)` | Large shadow |

#### Grid
| Class | Columns | Gap |
|--------|---------|-----|
| `.grid` | `1fr` | `1rem` |
| `.grid-2` | `1fr 1fr` | `1rem` |
| `.grid-3` | `1fr 1fr 1fr` | `1rem` |

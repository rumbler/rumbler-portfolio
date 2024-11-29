# Components Documentation

## Header

### Navigation
The header contains navigation links to different sections of the portfolio:
- Pipelines
- Developer
- Skills
- Projects

### Interactive Elements

#### Theme Toggle Button
Located in `components/Header/styles.ts`

```typescript
export const ThemeToggle = styled.button`
  // Estilo atual
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  
  // Efeitos
  &::before {
    // Gradiente verde na borda ao hover
    background: linear-gradient(90deg, #4CAF50, #45a049);
  }

  // Acessibilidade
  aria-label: "Switch to light/dark theme"
```

#### Mobile Menu Button
Located in `components/Header/styles.ts`

```typescript
export const FloatingButton = styled.button<FloatingButtonProps>`
  // Posicionamento
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  // Estilo atual
  background-color: ${({ theme }) => theme.secondaryBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;

  // Efeitos
  &::before {
    // Gradiente verde na borda ao hover
    background: linear-gradient(90deg, #4CAF50, #45a049);
  }

  // Acessibilidade
  aria-label: "Open/Close menu"
```

### Accessibility Features
1. Semantic HTML
   - `<header>` for the container
   - `<nav>` for navigation
   - `<button>` for interactive elements

2. ARIA Labels
   - Theme toggle button has dynamic aria-label based on current theme
   - Menu button has dynamic aria-label based on menu state

3. Keyboard Navigation
   - All interactive elements are focusable
   - Tab order follows logical flow

4. Visual Feedback
   - Hover states with transform and color changes
   - Active states for pressing buttons
   - Clear visual indication of current theme

### Responsive Design
- Collapses to mobile menu on screens <= 768px
- Floating menu button appears only on mobile
- Smooth transitions for menu open/close
- Appropriate touch target sizes for mobile

### Theme Support
- Supports both light and dark themes
- Theme-aware colors for text and backgrounds
- Consistent styling across themes
- Smooth transitions between themes

# Testing Guide 🧪

This document provides detailed information about testing in the Rumbler Soppa Portfolio project.

## Testing Stack 🛠️

- Jest: Testing framework
- React Testing Library: Testing utilities for React components
- @testing-library/user-event: Simulating user interactions
- @testing-library/jest-dom: Custom Jest matchers

## Test Organization 📁

Each component has its own test suite located in a `__tests__` directory alongside the component files. This co-location makes it easy to find and maintain tests alongside the components they test.

```bash
src/
└── components/
    └── ComponentName/
        ├── __tests__/
        │   └── ComponentName.test.tsx
        ├── index.tsx
        └── styles.ts
```

## Component Tests 🧩

### Header Component

```typescript
// Tests for navigation, theme toggle, and responsive menu
describe('Header Component', () => {
  it('should render logo text')
  it('should render navigation links')
  it('should toggle theme when button is clicked')
  it('should have correct navigation links')
});
```

### About Component

```typescript
// Tests for profile information and image
describe('About Component', () => {
  it('should render profile image')
  it('should render heading')
  it('should render introduction text')
  it('should render expertise paragraphs')
});
```

### Skills Component

```typescript
// Tests for skill cards and technology tags
describe('Skills Component', () => {
  it('should render the "Skills" heading')
  it('should render all skill cards')
  it('should render skill icons')
  it('should render technology tags')
});
```

### Pipelines Component

```typescript
// Tests for pipeline cards and descriptions
describe('Pipelines Component', () => {
  it('should render the "Pipelines" heading')
  it('should render all pipeline cards')
  it('should render pipeline descriptions')
  it('should render technology tags')
  it('should render links with icons')
});
```

### Projects Component

```typescript
// Tests for project cards and details
describe('Projects Component', () => {
  it('should render the "Featured Projects" heading')
  it('should render all project cards')
  it('should render project descriptions')
  it('should render project images')
  it('should render technology tags')
});
```

### Contact Component

```typescript
// Tests for social links and icons
describe('Contact Component', () => {
  it('should render the "Contact" heading')
  it('should render LinkedIn link with icon')
  it('should render GitHub link with icon')
  it('should render Email link with icon')
});
```

## Common Testing Patterns

### Rendering Components

```typescript
import { render, screen } from '@testing-library/react';

const renderComponent = () => {
  return render(<Component />);
};
```

### Testing Text Content

```typescript
it('should render text content', () => {
  render(<Component />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Testing Links

```typescript
it('should render link with correct attributes', () => {
  render(<Component />);
  const link = screen.getByText('Link Text').closest('a');
  expect(link).toHaveAttribute('href', 'expected/url');
});
```

### Testing Images

```typescript
it('should render image with correct alt text', () => {
  render(<Component />);
  const image = screen.getByAltText('Expected Alt Text');
  expect(image).toBeInTheDocument();
});
```

## Mocks

### Styled Components Mock

```typescript
jest.mock('styled-components', () => {
  const styled = {
    section: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <div {...props}>{children}</div>,
    // ... other element mocks
  };
  return {
    __esModule: true,
    default: styled,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});
```

### React Icons Mock

```typescript
jest.mock('react-icons/fa', () => ({
  FaGithub: () => <svg data-testid="icon-github" />,
  FaLinkedin: () => <svg data-testid="icon-linkedin" />,
  // ... other icon mocks
}));
```

## Running Tests

### All Tests

```bash
pnpm test
```

### Single Component

```bash
pnpm test ComponentName.test.tsx
```

### With Coverage

```bash
pnpm test --coverage
```

### Watch Mode

```bash
pnpm test --watch
```

## Test Coverage Goals

- Statements: 80%+ 📊
- Branches: 80%+ 🔀
- Functions: 80%+ ⚡
- Lines: 80%+ 📈

## Best Practices

1. Test Behavior, Not Implementation
   - Focus on what the component does, not how it does it
   - Use user-centric queries (getByText, getByRole, etc.)

2. Meaningful Test Names
   - Describe the expected behavior
   - Use clear, descriptive test names

3. Isolation
   - Each test should be independent
   - Clean up after each test

4. Mock External Dependencies
   - Mock styled-components
   - Mock icons and external resources
   - Keep tests fast and reliable

5. Accessibility Testing
   - Use getByRole when possible
   - Test keyboard navigation
   - Verify ARIA attributes

6. Maintenance
   - Keep tests simple and readable
   - Update tests when components change
   - Remove obsolete tests

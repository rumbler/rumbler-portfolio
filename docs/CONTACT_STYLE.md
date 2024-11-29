# Contact Component Style Guide

## Layout

- Centered content with flex layout
- Vertical spacing between elements: 2rem
- Maximum width for text content: 600px
- Responsive design that works in both light and dark themes

## Typography

- Title: Large headline style
- Description text: Body large style
- Button text: Label large style with icons

## Colors

### Light Theme

- Background: Light gray (#F5F5F5)
- Text: Dark (#333333)
- Buttons: 
  - Background: Green (#4CAF50)
  - Hover: Darker green (#45a049)
  - Text: White

### Dark Theme

- Background: Black (#000000)
- Text: White (#FFFFFF)
- Buttons: 
  - Background: Same green (#4CAF50)
  - Hover: Same darker green (#45a049)
  - Text: White

## Buttons

- Height: 40px (with padding 0.75rem 1.5rem)
- Border radius: 4px
- Icon + Text layout with 0.5rem gap
- Icon size: 1.2em relative to text
- Hover effect: 
  - Slight elevation (translateY(-2px))
  - Background color darkens
- Active state: Returns to original position

## Spacing

- Section padding: 4rem 2rem
- Gap between buttons: 1rem
- Text margins: 1rem bottom
- Container gap: 2rem

## Interactions

- Smooth transitions (0.3s ease)
- Hover effects on buttons
- Active state feedback
- External links open in new tab

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Sufficient color contrast
- Proper link attributes for external links
- Responsive text sizing

## Implementation Notes

```typescript
// Button base style
const ContactButton = styled.a`
  ${({ theme }) => theme.labelLarge}
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  svg {
    font-size: 1.2em;
  }

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
```

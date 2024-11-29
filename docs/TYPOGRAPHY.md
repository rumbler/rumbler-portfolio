# 📝 Typography System

This document outlines the typography system used in the portfolio project, which follows Material Design 3 guidelines.

## 🎯 Overview

The typography system has been updated to use Material Design 3's type scale, providing a more modern and consistent text hierarchy across the application.

## 📊 Type Scale

### 🔤 Display

- `displayLarge`: 57px / 64px
- `displayMedium`: 45px / 52px
- `displaySmall`: 36px / 44px

### 📰 Headline

- `headlineLarge`: 32px / 40px
- `headlineMedium`: 28px / 36px
- `headlineSmall`: 24px / 32px

### 📑 Title

- `titleLarge`: 22px / 28px
- `titleMedium`: 16px / 24px
- `titleSmall`: 14px / 20px

### 🏷️ Label

- `labelLarge`: 14px / 20px
- `labelMedium`: 12px / 16px
- `labelSmall`: 11px / 16px

### 📄 Body

- `bodyLarge`: 16px / 24px
- `bodyMedium`: 14px / 20px
- `bodySmall`: 12px / 16px

## 💡 Usage

### 🧩 In Components

```typescript
// Example of using typography in styled-components
import styled from 'styled-components';

export const Title = styled.h1`
  ${({ theme }) => theme.displayLarge}
`;

export const Paragraph = styled.p`
  ${({ theme }) => theme.bodyLarge}
`;
```

### 🌐 Global Styles

Default HTML elements are mapped to appropriate typography styles:

| HTML Element | Typography Token |
|-------------|-----------------|
| `h1` | `displayLarge` |
| `h2` | `displaySmall` |
| `h3` | `headlineLarge` |
| `h4` | `headlineMedium` |
| `h5` | `headlineSmall` |
| `h6` | `titleLarge` |
| `p` | `bodyLarge` |
| `a` | `labelLarge` |

## 📦 Recent Changes

### Version 1.0.0 🎉

- ✨ Updated typography system to align with Material Design 3
- 🔄 Renamed typography tokens to match MD3 naming convention
- 🔨 Updated all components to use new typography tokens
- 📏 Added consistent line heights and letter spacing
- 📱 Improved responsive typography scaling

## ⚙️ Implementation Details

The typography system is implemented in three main files:

1. 📄 `src/styles/typography.ts`: Contains all typography definitions
2. 🌍 `src/styles/globalStyles.ts`: Applies typography to HTML elements
3. 🎨 `src/styles/themes.ts`: Integrates typography with the theme system

## ✅ Best Practices

1. 📏 Always use the typography system instead of custom font sizes
2. 🏗️ Use semantic HTML elements with their default typography styles when possible
3. 🎯 Override typography styles only when necessary for specific design requirements
4. 📐 Maintain consistent spacing with the typography scale

---

📚 For more information about Material Design 3 Typography, visit the [official documentation](https://m3.material.io/styles/typography/overview).

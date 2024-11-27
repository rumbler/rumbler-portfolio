# Rumbler Soppa Portfolio Documentation

This documentation provides a comprehensive guide to the Rumbler Soppa portfolio website project.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Components](#components)
- [Testing](#testing)
- [Theme](#theme)
- [Contributing](#contributing)

## Overview

A modern, responsive portfolio website built with React and TypeScript, showcasing my work as a DevOps specialist. The website features a clean, professional design with sections for About, Skills, Pipelines, Projects, and Contact information.

### Key Features

- Responsive design that works on all devices 📱
- Light/Dark theme support 🌓
- Component-based architecture 🧩
- Comprehensive test coverage ✅
- TypeScript for type safety 📝
- Styled-components for styling 💅

### Tech Stack

- React ⚛️
- TypeScript 📘
- Styled Components 💅
- Jest & React Testing Library 🧪
- React Icons 🎯

## Project Structure

```bash
rumbler-portfolio/
├── docs/                   # Project documentation
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Header/
│   │   ├── Pipelines/
│   │   ├── Projects/
│   │   └── Skills/
│   ├── styles/            # Global styles and themes
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   └── index.tsx          # Application entry point
├── package.json           # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Components

### Header

- Navigation menu with smooth scrolling 🔄
- Theme toggle functionality 🌓
- Responsive design with mobile menu 📱

### About

- Professional introduction 📝
- Key expertise areas 💡
- Profile image 🖼️

### Skills

- Technical skills showcase 🎯
- Categorized skill cards 📊
- Technology tags 🏷️

### Pipelines

- CI/CD pipeline showcase 🚀
- Detailed pipeline descriptions 📝
- Technology stack for each pipeline 🛠️

### Projects

- Featured projects showcase 🎨
- Project descriptions and images 📝
- Technology stack for each project 🛠️

### Contact

- Social media links (LinkedIn, GitHub) 🔗
- Email contact option 📧
- Professional networking opportunities 🤝

## Testing

The project uses Jest and React Testing Library for testing. Each component has its own test suite located in a `__tests__` directory alongside the component.

### Test Structure

```bash
ComponentName/
├── __tests__/
│   └── ComponentName.test.tsx
├── index.tsx
└── styles.ts
```

### Test Coverage

Tests cover:

- Component rendering 🎯
- User interactions 🖱️
- Theme switching 🌓
- Navigation functionality 🔄
- Responsive design elements 📱

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for a specific component
pnpm test ComponentName.test.tsx

# Run tests with coverage report
pnpm test --coverage
```

## Theme

The website uses a theme system implemented with styled-components. Two themes are available:

### Light Theme

- Clean, professional appearance ✨
- White background ⚪
- Dark text ⚫
- Accent colors for highlights 🎨

### Dark Theme

- Modern, sleek appearance ✨
- Dark background ⚫
- Light text ⚪
- Accent colors for highlights 🎨

## Contributing

1. Fork the repository 🔱
2. Create a feature branch (`git checkout -b feature/AmazingFeature`) 🌿
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`) ✍️
4. Push to the branch (`git push origin feature/AmazingFeature`) 📤
5. Open a Pull Request 🔄

### Development Guidelines

- Follow the existing code style 📝
- Add tests for new features 🧪
- Update documentation as needed 📚
- Ensure all tests pass before submitting PR ✅
- Use meaningful commit messages 💬

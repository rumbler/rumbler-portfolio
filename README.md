# Rumbler Soppa Portfolio 🚀

[![Continuous Integration](https://github.com/rumbler/rumbler-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rumbler/rumbler-portfolio/actions/workflows/ci.yml)

> A modern and responsive portfolio built with React and TypeScript, showcasing my expertise as a DevOps specialist.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

## Highlights

- Modern and responsive design
- Material Design 3 typography system
- Light/Dark theme support
- Component-based architecture
- Mobile-optimized
- Comprehensive test coverage
- TypeScript for type safety

## Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/rumbler/rumbler-portfolio.git
   cd rumbler-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Open in browser**

   ```bash
   http://localhost:3000
   ```

## Available Scripts

- `npm start`        - Starts development server
- `npm test`         - Runs tests
- `npm run build`    - Creates production build
- `npm run lint`     - Checks for linting issues
- `npm run format`   - Formats code with Prettier

## Project Structure

```bash
rumbler-portfolio/
├── docs/              # Detailed documentation
│   └── TYPOGRAPHY.md  # Typography system documentation
├── public/            # Static files
└── src/
    ├── components/    # React components
    │   └── __tests__  # Component tests
    ├── styles/        # Themes and global styles
    │   ├── typography.ts    # Typography definitions
    │   ├── themes.ts       # Theme configurations
    │   └── globalStyles.ts # Global style definitions
    ├── types/         # TypeScript definitions
    └── utils/         # Utility functions
```

## Design System

The project follows Material Design 3 guidelines for a consistent and modern user experience:

### Typography

The typography system has been updated to use Material Design 3's type scale. This provides:

- Consistent text hierarchy
- Improved readability
- Responsive scaling
- Semantic HTML mapping

For detailed information about the typography system, check out the [Typography Documentation](./docs/TYPOGRAPHY.md).

### Themes

The project includes both light and dark themes, with:

- Consistent color palette
- Accessible contrast ratios
- Smooth theme transitions
- Material Design color tokens

## Documentation

For detailed documentation about components, themes, and more, check out the [docs folder](./docs):

- [Typography System](./docs/TYPOGRAPHY.md)

## License

This project is under the MIT License. See the [LICENSE](LICENSE) file for details.

---

⭐️ Made with ❤️ by [Rumbler Soppa](https://github.com/rumbler)

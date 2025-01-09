# Portfolio Project

[![CI](https://github.com/rumbler/rumbler-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rumbler/rumbler-portfolio/actions/workflows/ci.yml)

[![Production](https://github.com/rumbler/rumbler-portfolio/actions/workflows/production.yml/badge.svg)](https://github.com/rumbler/rumbler-portfolio/actions/workflows/production.yml)

[![Quality Gate Status](https://sonar.rumblersoppa.com.br/api/project_badges/measure?project=rumbler_rumbler-portfolio_e61e381c-3f60-4e1f-a0bc-809cfb702da8&metric=alert_status&token=sqb_aad0420c22708ccfb1b18334bc1d729c7e5508c0)](https://sonar.rumblersoppa.com.br/dashboard?id=rumbler_rumbler-portfolio_e61e381c-3f60-4e1f-a0bc-809cfb702da8)

> A modern and responsive portfolio built with React and TypeScript.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![Nexus](https://img.shields.io/badge/Nexus%20Repository-143752?style=for-the-badge&logo=sonatype&logoColor=white)](https://www.sonatype.com/products/nexus-repository)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://www.cloudflare.com)

## Highlights

- Modern and responsive design
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
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm start
   ```

4. **Open in browser**

   ```bash
   http://localhost:3000
   ```

## Available Scripts

- `pnpm start`        - Starts development server
- `pnpm build`        - Creates production build
- `pnpm test`         - Runs tests
- `pnpm version:patch`- Bump patch version
- `pnpm version:minor`- Bump minor version
- `pnpm version:major`- Bump major version
- `pnpm start:prod`   - Starts production server

## Project Structure

```bash
rumbler-portfolio/
├── .github/          # GitHub Actions workflows
├── docs/             # Project documentation
├── public/           # Static files
├── scripts/          # Utility scripts
├── src/              # Source code
│   ├── components/   # React components
│   ├── styles/       # Themes and global styles
│   ├── types/        # TypeScript definitions
│   └── utils/        # Utility functions
├── Dockerfile        # Docker configuration
├── docker-compose.yml# Docker Compose configuration
├── package.json      # Project dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Environments

- **Production**: [example.com](https://example.com)

## License

This project is under the MIT License. See the [LICENSE](LICENSE) file for details.

---

 Made with  by [Rumbler Soppa](https://github.com/rumbler)

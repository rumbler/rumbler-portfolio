import { createGlobalStyle } from 'styled-components';
import { typography } from './typography';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    ${typography.bodyMedium}
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
    padding-top: 80px; 
    min-height: 100vh;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;

    @media (min-width: 1024px) {
      padding-top: 90px;
      padding-left: 4rem;
      padding-right: 4rem;
    }
  }

  h1 {
    ${typography.displayLarge}
    color: ${({ theme }) => theme.text};
    line-height: 1.2;
  }

  h2 {
    ${typography.displaySmall}
    color: ${({ theme }) => theme.text};
    line-height: 1.2;
  }

  h3 {
    ${typography.headlineLarge}
    color: ${({ theme }) => theme.text};
    line-height: 1.2;
  }

  h4 {
    ${typography.headlineMedium}
    color: ${({ theme }) => theme.text};
    line-height: 1.2;
  }

  h5 {
    ${typography.headlineSmall}
    color: ${({ theme }) => theme.text};
    line-height: 1.2;
  }

  h6 {
    ${typography.titleLarge}
    color: ${({ theme }) => theme.text};
    line-height: 1.2;
  }

  p {
    ${typography.bodyLarge}
  }

  a {
    ${typography.labelLarge}
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }

  ::-webkit-scrollbar-thumb {
    background: #4CAF50;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #45a049;
  }
`;

export default GlobalStyle;

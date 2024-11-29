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
  }

  body {
    ${typography.bodyMedium}
    background-color: ${({ theme }) => theme.background};
  }

  h1 {
    ${typography.displayLarge}
  }

  h2 {
    ${typography.displaySmall}
  }

  h3 {
    ${typography.headlineLarge}
  }

  h4 {
    ${typography.headlineMedium}
  }

  h5 {
    ${typography.headlineSmall}
  }

  h6 {
    ${typography.titleLarge}
  }

  p {
    ${typography.bodyLarge}
  }

  a {
    ${typography.labelLarge}
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;

import { css } from 'styled-components';

const baseStyles = css`
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.text};
`;

export const typography = {
  // Display Styles
  displayLarge: css`
    ${baseStyles}
    font-size: 57px;
    line-height: 64px;
    letter-spacing: -0.25px;
    font-weight: 400;
  `,
  displayMedium: css`
    ${baseStyles}
    font-size: 45px;
    line-height: 52px;
    font-weight: 400;
  `,
  displaySmall: css`
    ${baseStyles}
    font-size: 36px;
    line-height: 44px;
    font-weight: 400;
  `,

  // Headline Styles
  headlineLarge: css`
    ${baseStyles}
    font-size: 32px;
    line-height: 40px;
    font-weight: 400;
  `,
  headlineMedium: css`
    ${baseStyles}
    font-size: 28px;
    line-height: 36px;
    font-weight: 400;
  `,
  headlineSmall: css`
    ${baseStyles}
    font-size: 24px;
    line-height: 32px;
    font-weight: 400;
  `,

  // Title Styles
  titleLarge: css`
    ${baseStyles}
    font-size: 22px;
    line-height: 28px;
    font-weight: 400;
  `,
  titleMedium: css`
    ${baseStyles}
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.15px;
    font-weight: 500;
  `,
  titleSmall: css`
    ${baseStyles}
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    font-weight: 500;
  `,

  // Label Styles
  labelLarge: css`
    ${baseStyles}
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    font-weight: 500;
  `,
  labelMedium: css`
    ${baseStyles}
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
    font-weight: 500;
  `,
  labelSmall: css`
    ${baseStyles}
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.5px;
    font-weight: 500;
  `,

  // Body Styles
  bodyLarge: css`
    ${baseStyles}
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
    font-weight: 400;
  `,
  bodyMedium: css`
    ${baseStyles}
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    font-weight: 400;
  `,
  bodySmall: css`
    ${baseStyles}
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    font-weight: 400;
  `
};

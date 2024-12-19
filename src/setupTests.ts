// jest-dom adiciona novos matchers personalizados para asserções em nós do DOM.
// Permite que você faça coisas como:
// expect(element).toHaveTextContent(/react/i)
// Saiba mais: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      toHaveClass(className: string): R;
    }
  }
}

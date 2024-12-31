import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';

// Mock dos componentes
jest.mock('./components/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('./components/About', () => () => <div data-testid="mock-about">About</div>);
jest.mock('./components/Skills', () => () => <div data-testid="mock-skills">Skills</div>);
jest.mock('./components/Contact', () => () => <div data-testid="mock-contact">Contact</div>);
jest.mock('./components/LandingPage', () => () => <div data-testid="mock-landing">LandingPage</div>);

// Mock ThemeProvider
const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="mock-theme-provider">{children}</div>
);

describe('App Component', () => {
  it('renders without crashing', () => {
    act(() => {
      render(
        <MockThemeProvider>
          <App />
        </MockThemeProvider>
      );
    });
    
    // Adicione aqui verificações básicas do App
    expect(screen.getByTestId('mock-theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-landing')).toBeInTheDocument();
    expect(screen.getByTestId('mock-about')).toBeInTheDocument();
    expect(screen.getByTestId('mock-skills')).toBeInTheDocument();
    expect(screen.getByTestId('mock-contact')).toBeInTheDocument();
  });
});

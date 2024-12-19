import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock dos componentes
jest.mock('./components/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('./components/About', () => () => <div data-testid="mock-about">About</div>);
jest.mock('./components/Skills', () => () => <div data-testid="mock-skills">Skills</div>);
jest.mock('./components/Contact', () => () => <div data-testid="mock-contact">Contact</div>);
jest.mock('./components/LandingPage', () => () => <div data-testid="mock-landing">LandingPage</div>);

// Mock do ThemeProvider
jest.mock('./contexts/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({
    isDarkMode: false,
    toggleTheme: jest.fn(),
  }),
}));

describe('App Component', () => {
  it('should render all main sections', () => {
    act(() => {
      render(<App />);
    });
    
    // Verificar se todos os componentes principais estão presentes
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-landing')).toBeInTheDocument();
    expect(screen.getByTestId('mock-about')).toBeInTheDocument();
    expect(screen.getByTestId('mock-skills')).toBeInTheDocument();
    expect(screen.getByTestId('mock-contact')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '..';

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ThemeProvider
const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="mock-theme-provider">{children}</div>
);

describe('About Component', () => {
  it('renders without crashing', () => {
    render(
      <MockThemeProvider>
        <About />
      </MockThemeProvider>
    );
    
    expect(screen.getByText(/DevOps & Especialista em Cloud/i)).toBeInTheDocument();
  });

  it('displays profile information', () => {
    render(
      <MockThemeProvider>
        <About />
      </MockThemeProvider>
    );
    
    expect(screen.getByText(/DevOps & Especialista em Cloud/i)).toBeInTheDocument();
    expect(screen.getByText(/Especialista em tecnologia/i)).toBeInTheDocument();
    expect(screen.getByText(/tecnologias de ponta/i)).toBeInTheDocument();
  });
});

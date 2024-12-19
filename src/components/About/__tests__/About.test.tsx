import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../contexts/ThemeContext';
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

describe('About Component', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <About />
      </ThemeProvider>
    );
    
    expect(screen.getByText(/DevOps & Especialista em Cloud/i)).toBeInTheDocument();
  });

  it('displays profile information', () => {
    render(
      <ThemeProvider>
        <About />
      </ThemeProvider>
    );
    
    expect(screen.getByText(/DevOps & Especialista em Cloud/i)).toBeInTheDocument();
    expect(screen.getByText(/Especialista em tecnologia/i)).toBeInTheDocument();
    expect(screen.getByText(/tecnologias de ponta/i)).toBeInTheDocument();
  });
});

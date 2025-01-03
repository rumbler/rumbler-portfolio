import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../index';

// Mock environment variables
process.env.REACT_APP_LINKEDIN_URL = 'https://linkedin.com/test';
process.env.REACT_APP_GITHUB_URL = 'https://github.com/test';
process.env.REACT_APP_EMAIL_URL = 'mailto:test@example.com';
process.env.REACT_APP_WHATSAPP_URL = 'https://wa.me/test';

// Mock react-icons/fa
jest.mock('react-icons/fa', () => ({
  FaLinkedin: () => <svg data-testid="icon-linkedin" />,
  FaGithub: () => <svg data-testid="icon-github" />,
  FaEnvelope: () => <svg data-testid="icon-email" />,
  FaWhatsapp: () => <svg data-testid="icon-whatsapp" />
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ThemeProvider
const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="mock-theme-provider">{children}</div>
);

describe('Contact Component', () => {
  it('renders without crashing', () => {
    render(
      <MockThemeProvider>
        <Contact />
      </MockThemeProvider>
    );
    
    expect(screen.getByText('Entre em Contato')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(
      <MockThemeProvider>
        <Contact />
      </MockThemeProvider>
    );
    
    // Verifica textos
    expect(screen.getByText(/Você pode me encontrar na web/i)).toBeInTheDocument();
    expect(screen.getByText(/Se preferir entre em contato/i)).toBeInTheDocument();

    // Verifica ícones
    expect(screen.getByTestId('icon-linkedin')).toBeInTheDocument();
    expect(screen.getByTestId('icon-github')).toBeInTheDocument();
    expect(screen.getByTestId('icon-email')).toBeInTheDocument();
    expect(screen.getByTestId('icon-whatsapp')).toBeInTheDocument();
  });

  it('has correct links', () => {
    render(
      <MockThemeProvider>
        <Contact />
      </MockThemeProvider>
    );
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);

    const linkedinLink = links.find(link => link.getAttribute('href') === process.env.REACT_APP_LINKEDIN_URL);
    const githubLink = links.find(link => link.getAttribute('href') === process.env.REACT_APP_GITHUB_URL);
    const emailLink = links.find(link => link.getAttribute('href') === process.env.REACT_APP_EMAIL_URL);
    const whatsappLink = links.find(link => link.getAttribute('href') === process.env.REACT_APP_WHATSAPP_URL);

    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();
    expect(whatsappLink).toBeInTheDocument();
  });
});

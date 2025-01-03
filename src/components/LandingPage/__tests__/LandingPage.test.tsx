import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from '..';

// Configurar variáveis de ambiente para testes
process.env.REACT_APP_LINKEDIN_URL = 'https://linkedin.com/test';
process.env.REACT_APP_GITHUB_URL = 'https://github.com/test';
process.env.REACT_APP_EMAIL_URL = 'test@email.com';

// Mock de ícones para evitar problemas de importação
jest.mock('react-icons/fa', () => ({
  FaLinkedin: () => <div data-testid="linkedin-icon">LinkedIn</div>,
  FaGithub: () => <div data-testid="github-icon">GitHub</div>,
  FaEnvelope: () => <div data-testid="email-icon">Email</div>
}));

describe('LandingPage Component', () => {
  it('renders the main heading', () => {
    render(<LandingPage />);
    
    const heading = screen.getByText('Rumbler Soppa');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-6xl');
  });

  it('renders social media icons', () => {
    render(<LandingPage />);
    
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByTestId('email-icon')).toBeInTheDocument();
  });

  it('displays job title text', () => {
    render(<LandingPage />);
    
    // Busca o elemento de digitação usando data-testid
    const typingSpan = screen.getByTestId('typing-text');
    
    // Verifica se o elemento existe
    expect(typingSpan).toBeInTheDocument();
  });

  it('has correct background styling', () => {
    render(<LandingPage />);
    
    const section = screen.getByTestId('landing-section');
    expect(section).toHaveStyle({
      backgroundImage: 'url(/assets/images/hero-bg12.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    });
  });

  it('has correct social media links', () => {
    render(<LandingPage />);
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', process.env.REACT_APP_LINKEDIN_URL);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', process.env.REACT_APP_GITHUB_URL);

    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute('href', `mailto:${process.env.REACT_APP_EMAIL_URL}`);
  });
});

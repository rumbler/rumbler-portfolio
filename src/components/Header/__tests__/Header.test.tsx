import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/themes';
import Header from '../index';

const mockToggleTheme = jest.fn();

// Mock do useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    isDarkMode: false,
    toggleTheme: mockToggleTheme,
  }),
}));

const renderHeader = () => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <Header />
    </ThemeProvider>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    window.innerWidth = 1024;
    mockToggleTheme.mockClear();
  });

  it('renders logo and navigation items', () => {
    renderHeader();
    
    expect(screen.getByText('Rumbler Soppa')).toBeInTheDocument();
    expect(screen.getByText('Pipelines')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('has correct href for Contact link', () => {
    renderHeader();
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('has correct hrefs for all navigation links', () => {
    renderHeader();
    
    const navigationLinks = {
      'Pipelines': '#pipelines',
      'Developer': '#developer',
      'Skills': '#skills',
      'Projects': '#projects',
      'About': '#about',
      'Contact': '#contact'
    };

    Object.entries(navigationLinks).forEach(([text, href]) => {
      const link = screen.getByText(text).closest('a');
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('toggles theme when theme button is clicked', () => {
    renderHeader();
    
    const themeButton = screen.getByRole('button', { name: /switch to dark theme/i });
    fireEvent.click(themeButton);
    
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  describe('Mobile Menu', () => {
    beforeEach(() => {
      window.innerWidth = 768;
    });

    it('shows menu button on mobile', () => {
      renderHeader();
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('toggles menu when menu button is clicked', () => {
      renderHeader();
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      fireEvent.click(menuButton);
      expect(screen.getByText('Pipelines')).toBeVisible();
      
      fireEvent.click(menuButton);
      expect(screen.getByText('Pipelines')).not.toBeVisible();
    });

    it('closes menu when nav item is clicked', () => {
      renderHeader();
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      fireEvent.click(menuButton);
      fireEvent.click(screen.getByText('Pipelines'));
      
      expect(screen.getByText('Pipelines')).not.toBeVisible();
    });
  });
});

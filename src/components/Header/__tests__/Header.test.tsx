import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/themes';
import Header from '../index';

const mockSetThemeMode = jest.fn();

jest.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    isDarkMode: false,
    currentMode: 'system',
    setThemeMode: mockSetThemeMode,
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
    mockSetThemeMode.mockClear();
    localStorage.clear();
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

  describe('Theme Selection', () => {
    it('shows theme options when theme button is clicked', () => {
      renderHeader();
      
      const themeButton = screen.getByLabelText('Theme selector');
      fireEvent.click(themeButton);
      
      expect(screen.getByText('Light')).toBeInTheDocument();
      expect(screen.getByText('Dark')).toBeInTheDocument();
      expect(screen.getByText('System')).toBeInTheDocument();
    });

    it('calls setThemeMode with correct theme when option is selected', () => {
      renderHeader();
      
      const themeButton = screen.getByLabelText('Theme selector');
      fireEvent.click(themeButton);
      
      const lightOption = screen.getByText('Light');
      fireEvent.click(lightOption);
      
      expect(mockSetThemeMode).toHaveBeenCalledWith('light');
    });

    it('closes theme selector after selecting an option', () => {
      renderHeader();
      
      const themeButton = screen.getByLabelText('Theme selector');
      fireEvent.click(themeButton);
      
      const darkOption = screen.getByText('Dark');
      fireEvent.click(darkOption);
      
      expect(screen.queryByText('Light')).not.toBeInTheDocument();
    });
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

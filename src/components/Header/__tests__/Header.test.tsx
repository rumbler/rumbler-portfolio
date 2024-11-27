import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../index';
import { ThemeProvider } from '../../../contexts/ThemeContext';

const mockToggleTheme = jest.fn();

// Mock do useTheme hook
jest.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    isDarkMode: false,
    toggleTheme: mockToggleTheme,
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Header Component', () => {
  beforeEach(() => {
    mockToggleTheme.mockClear();
  });

  const renderHeader = () => {
    return render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
  };

  it('should render the logo text', async () => {
    renderHeader();
    expect(await screen.findByText('Rumbler Soppa')).toBeInTheDocument();
  });

  it('should render all navigation links', async () => {
    renderHeader();
    const navItems = ['About', 'Skills', 'Pipelines', 'Projects', 'Contact'];
    
    for (const item of navItems) {
      const link = await screen.findByText(item);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `#${item.toLowerCase()}`);
    }
  });

  it('should render theme toggle button', async () => {
    renderHeader();
    const themeToggle = await screen.findByRole('button');
    expect(themeToggle).toBeInTheDocument();
  });

  it('should call toggleTheme when theme button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();
    const themeToggle = await screen.findByRole('button');
    await user.click(themeToggle);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock dos componentes
jest.mock('./components/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('./components/About', () => () => <div data-testid="mock-about">About</div>);
jest.mock('./components/Skills', () => () => <div data-testid="mock-skills">Skills</div>);
jest.mock('./components/Pipelines', () => () => <div data-testid="mock-pipelines">Pipelines</div>);
jest.mock('./components/Projects', () => () => <div data-testid="mock-projects">Projects</div>);
jest.mock('./components/Contact', () => () => <div data-testid="mock-contact">Contact</div>);

// Mock do ThemeProvider
jest.mock('./contexts/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({
    isDarkMode: false,
    toggleTheme: jest.fn(),
  }),
}));

describe('App Component', () => {
  it('should render all main sections', async () => {
    render(<App />);
    
    // Verificar se todos os componentes principais estão presentes
    expect(await screen.findByTestId('mock-header')).toBeInTheDocument();
    expect(await screen.findByTestId('mock-about')).toBeInTheDocument();
    expect(await screen.findByTestId('mock-skills')).toBeInTheDocument();
    expect(await screen.findByTestId('mock-pipelines')).toBeInTheDocument();
    expect(await screen.findByTestId('mock-projects')).toBeInTheDocument();
    expect(await screen.findByTestId('mock-contact')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from '..';

// Mock ThemeProvider
const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="mock-theme-provider">{children}</div>
);

// Mock react-icons/fa
jest.mock('react-icons/fa', () => ({
  FaPython: () => <svg data-testid="icon-python" />,
  FaNodeJs: () => <svg data-testid="icon-nodejs" />,
  FaTerminal: () => <svg data-testid="icon-terminal" />,
  FaBook: () => <svg data-testid="icon-book" />,
  FaBrain: () => <svg data-testid="icon-brain" />,
  FaLaptopCode: () => <svg data-testid="icon-laptop-code" />,
  FaCloudscale: () => <svg data-testid="icon-cloudscale" />
}));

// Mock react-icons/si
jest.mock('react-icons/si', () => ({
  SiGooglecloud: () => <svg data-testid="icon-googlecloud" />,
  SiAmazon: () => <svg data-testid="icon-amazon" />,
  SiCloudflare: () => <svg data-testid="icon-cloudflare" />,
  SiDigitalocean: () => <svg data-testid="icon-digitalocean" />,
  SiDocker: () => <svg data-testid="icon-docker" />,
  SiTerraform: () => <svg data-testid="icon-terraform" />,
  SiJenkins: () => <svg data-testid="icon-jenkins" />,
  SiGrafana: () => <svg data-testid="icon-grafana" />,
  SiPrometheus: () => <svg data-testid="icon-prometheus" />,
  SiElasticsearch: () => <svg data-testid="icon-elasticsearch" />,
  SiLinux: () => <svg data-testid="icon-linux" />,
  SiCplusplus: () => <svg data-testid="icon-cplusplus" />
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock window.matchMedia
const matchMediaMock = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), 
  removeListener: jest.fn(), 
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: matchMediaMock
});

describe('Skills Component', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    matchMediaMock.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <MockThemeProvider>
        <Skills />
      </MockThemeProvider>
    );
    
    expect(screen.getByText('Minhas Habilidades')).toBeInTheDocument();
  });

  it('displays all skill sections', () => {
    render(
      <MockThemeProvider>
        <Skills />
      </MockThemeProvider>
    );
    
    // Verifica seções de habilidades
    const sections = [
      'Cloud Computing', 
      'DevOps', 
      'Observabilidade', 
      'Infraestrutura', 
      'Desenvolvimento', 
      'Abordagem Técnica'
    ];

    sections.forEach(section => {
      expect(screen.getByText(section)).toBeInTheDocument();
    });
  });

  it('displays cloud skills', () => {
    render(
      <MockThemeProvider>
        <Skills />
      </MockThemeProvider>
    );
    
    const cloudSkills = [
      'Google Cloud', 
      'AWS', 
      'Cloudflare', 
      'DigitalOcean'
    ];

    cloudSkills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('displays development skills', () => {
    render(
      <MockThemeProvider>
        <Skills />
      </MockThemeProvider>
    );
    
    const devSkills = [
      'Shell Script', 
      'Python', 
      'Node.js', 
      'C++'
    ];

    devSkills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('displays technical approach', () => {
    render(
      <MockThemeProvider>
        <Skills />
      </MockThemeProvider>
    );
    
    const technicalApproach = [
      'Práticas de Código Limpo', 
      'Documentação Prioritária', 
      'Aprendizado Contínuo'
    ];

    technicalApproach.forEach(approach => {
      expect(screen.getByText(approach)).toBeInTheDocument();
    });
  });
});

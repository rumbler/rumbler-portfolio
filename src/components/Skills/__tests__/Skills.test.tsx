import { render, screen } from '@testing-library/react';
import Skills from '../index';

// Mock react-icons/fa
jest.mock('react-icons/fa', () => ({
  FaDocker: () => <svg data-testid="icon-docker" />,
  FaAws: () => <svg data-testid="icon-aws" />,
  FaLinux: () => <svg data-testid="icon-linux" />,
  FaCloud: () => <svg data-testid="icon-cloud" />,
  FaCode: () => <svg data-testid="icon-code" />,
  FaServer: () => <svg data-testid="icon-server" />
}));

// Mock styled-components
jest.mock('styled-components', () => {
  const styled = {
    section: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, as: Component = 'div', ...props }: any) => {
        if (Component === 'div') {
          return <div {...props}>{children}</div>;
        }
        return <Component data-testid={`icon-${props.icon}`} {...props}>{children}</Component>;
      },
    article: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <article {...props}>{children}</article>,
    h2: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <h3 {...props}>{children}</h3>
  };
  return {
    __esModule: true,
    default: styled,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('Skills Component', () => {
  const renderSkills = () => {
    return render(<Skills />);
  };

  it('should render the "My Skills" heading', () => {
    renderSkills();
    const heading = screen.getByText('My Skills');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('should render all skill cards with correct titles', () => {
    renderSkills();
    const expectedSkills = [
      'Docker',
      'AWS',
      'Linux',
      'Kubernetes',
      'CI/CD',
      'Infrastructure as Code'
    ];

    expectedSkills.forEach(skillTitle => {
      const skillElement = screen.getByText(skillTitle);
      expect(skillElement).toBeInTheDocument();
    });
  });

  it('should render all skill icons', () => {
    const { container } = renderSkills();
    const icons = container.querySelectorAll('[data-testid^="icon-"]');
    expect(icons).toHaveLength(6);
  });

  it('should have correct section id for navigation', () => {
    renderSkills();
    const section = document.getElementById('skills');
    expect(section).toBeInTheDocument();
  });

  it('should render the correct number of skill cards', () => {
    renderSkills();
    const skillCards = screen.getAllByText(/^(Docker|AWS|Linux|Kubernetes|CI\/CD|Infrastructure as Code)$/);
    expect(skillCards).toHaveLength(6);
  });
});

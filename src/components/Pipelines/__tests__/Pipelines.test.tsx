import { render, screen } from '@testing-library/react';
import Pipelines from '../index';

// Mock react-icons/fa
jest.mock('react-icons/fa', () => ({
  FaGithub: () => <svg data-testid="icon-github" />,
  FaExternalLinkAlt: () => <svg data-testid="icon-external-link" />
}));

// Mock styled-components
jest.mock('styled-components', () => {
  const styled = {
    section: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <p {...props}>{children}</p>,
    ul: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <li {...props}>{children}</li>
  };
  return {
    __esModule: true,
    default: styled,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('Pipelines Component', () => {
  const renderPipelines = () => {
    return render(<Pipelines />);
  };

  it('should render the "CI/CD Pipelines" heading', () => {
    renderPipelines();
    const heading = screen.getByText('CI/CD Pipelines');
    expect(heading).toBeInTheDocument();
  });

  it('should render all pipeline cards with correct titles', () => {
    renderPipelines();
    const expectedTitles = [
      'AWS ECS Deployment Pipeline',
      'Kubernetes GitOps Pipeline',
      'Multi-Cloud Infrastructure Pipeline'
    ];

    expectedTitles.forEach(title => {
      const titleElement = screen.getByText(title);
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.tagName).toBe('H3');
    });
  });

  it('should render pipeline descriptions', () => {
    renderPipelines();
    const descriptions = [
      'Automated CI/CD pipeline for containerized applications',
      'GitOps-based deployment pipeline using ArgoCD',
      'Infrastructure as Code pipeline supporting multiple cloud providers'
    ];

    descriptions.forEach(description => {
      const descElement = screen.getByText(new RegExp(description));
      expect(descElement).toBeInTheDocument();
      expect(descElement.tagName).toBe('P');
    });
  });

  it('should render all technology tags for each pipeline', () => {
    renderPipelines();
    const technologies = [
      'AWS ECS', 'CodePipeline', 'Docker', 'GitHub Actions',
      'Kubernetes', 'ArgoCD', 'Helm', 'Prometheus', 'Jenkins',
      'AWS', 'GCP', 'Azure', 'CircleCI'
    ];

    // Verifica tecnologias únicas
    technologies.forEach(tech => {
      const techElement = screen.getByText(tech);
      expect(techElement).toBeInTheDocument();
    });

    // Verifica tecnologias que aparecem mais de uma vez
    const duplicateTechs = ['Terraform'];
    duplicateTechs.forEach(tech => {
      const techElements = screen.getAllByText(tech);
      expect(techElements).toHaveLength(2);
      techElements.forEach(element => {
        expect(element).toBeInTheDocument();
      });
    });
  });

  it('should render GitHub and Demo links with icons', () => {
    const { container } = renderPipelines();
    
    // Verifica os links do GitHub
    const githubLinks = screen.getAllByText('Code');
    expect(githubLinks).toHaveLength(3);
    githubLinks.forEach(link => {
      const linkElement = link.closest('a');
      expect(linkElement).toHaveAttribute('href', expect.stringContaining('github.com'));
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });

    // Verifica os links de Demo
    const demoLinks = screen.getAllByText('Demo');
    expect(demoLinks).toHaveLength(3);
    demoLinks.forEach(link => {
      const linkElement = link.closest('a');
      expect(linkElement).toHaveAttribute('href', expect.stringContaining('your-demo-link.com'));
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });

    // Verifica se os ícones estão presentes
    const githubIcons = container.querySelectorAll('[data-testid="icon-github"]');
    expect(githubIcons).toHaveLength(3);
    const externalLinkIcons = container.querySelectorAll('[data-testid="icon-external-link"]');
    expect(externalLinkIcons).toHaveLength(3);
  });

  it('should have correct section id for navigation', () => {
    renderPipelines();
    const section = document.getElementById('pipelines');
    expect(section).toBeInTheDocument();
  });
});

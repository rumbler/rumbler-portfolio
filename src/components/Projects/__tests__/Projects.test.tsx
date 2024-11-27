import { render, screen } from '@testing-library/react';
import Projects from '../index';

// Mock styled-components
jest.mock('styled-components', () => {
  const styled = {
    section: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <div {...props}>{children}</div>,
    img: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
    h2: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <span {...props}>{children}</span>
  };
  return {
    __esModule: true,
    default: styled,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('Projects Component', () => {
  const renderProjects = () => {
    return render(<Projects />);
  };

  it('should render the "Featured Projects" heading', () => {
    renderProjects();
    const heading = screen.getByText('Featured Projects');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('should render all project cards with correct titles', () => {
    renderProjects();
    const expectedTitles = [
      'Infrastructure Automation',
      'Microservices Containerization',
      'Continuous Integration Pipeline'
    ];

    expectedTitles.forEach(title => {
      const titleElement = screen.getByText(title);
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.tagName).toBe('H3');
    });
  });

  it('should render project descriptions', () => {
    renderProjects();
    const descriptions = [
      'Infrastructure automation project using Terraform and AWS',
      'Implementation of microservices architecture with Docker and Kubernetes',
      'Development of robust CI/CD pipeline with Jenkins'
    ];

    descriptions.forEach(description => {
      const descElement = screen.getByText(description);
      expect(descElement).toBeInTheDocument();
      expect(descElement.tagName).toBe('P');
    });
  });

  it('should render project images with correct alt text', () => {
    renderProjects();
    const expectedImages = [
      { src: '/images/projeto1.png', alt: 'Infrastructure Automation' },
      { src: '/images/projeto2.png', alt: 'Microservices Containerization' },
      { src: '/images/projeto3.png', alt: 'Continuous Integration Pipeline' }
    ];

    expectedImages.forEach(img => {
      const imgElement = screen.getByAltText(img.alt);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement.tagName).toBe('IMG');
      expect(imgElement).toHaveAttribute('src', img.src);
    });
  });

  it('should render all technology tags', () => {
    renderProjects();
    const technologies = [
      'Terraform', 'AWS',
      'Docker', 'Kubernetes', 'Microservices',
      'Jenkins', 'GitHub Actions'
    ];

    // Verifica tecnologias únicas
    technologies.forEach(tech => {
      const techElement = screen.getByText(tech);
      expect(techElement).toBeInTheDocument();
      expect(techElement.tagName).toBe('SPAN');
    });

    // Verifica tecnologias que aparecem mais de uma vez
    const duplicateTechs = ['CI/CD'];
    duplicateTechs.forEach(tech => {
      const techElements = screen.getAllByText(tech);
      expect(techElements).toHaveLength(2);
      techElements.forEach(element => {
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('SPAN');
      });
    });
  });

  it('should have correct section id for navigation', () => {
    renderProjects();
    const section = document.getElementById('projects');
    expect(section).toBeInTheDocument();
  });
});

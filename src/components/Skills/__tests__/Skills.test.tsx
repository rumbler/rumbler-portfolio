import { render, screen } from '@testing-library/react';
import Skills from '../index';

// Mock react-icons/fa
jest.mock('react-icons/fa', () => ({
  FaAws: () => <svg data-testid="icon-aws" />,
  FaDocker: () => <svg data-testid="icon-docker" />,
  FaJenkins: () => <svg data-testid="icon-jenkins" />,
  FaGithub: () => <svg data-testid="icon-github" />
}));

// Mock react-icons/si
jest.mock('react-icons/si', () => ({
  SiKubernetes: () => <svg data-testid="icon-kubernetes" />,
  SiTerraform: () => <svg data-testid="icon-terraform" />
}));

// Mock styled-components
jest.mock('styled-components', () => {
  const styled = {
    section: () => ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: () => ({ children, ...props }: any) => <div {...props}>{children}</div>,
    article: () => ({ children, ...props }: any) => <article {...props}>{children}</article>,
    h2: () => ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: () => ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: () => ({ children, ...props }: any) => <p {...props}>{children}</p>
  };

  styled.section.attrs = () => styled.section;
  styled.div.attrs = () => styled.div;
  styled.article.attrs = () => styled.article;
  styled.h2.attrs = () => styled.h2;
  styled.h3.attrs = () => styled.h3;
  styled.p.attrs = () => styled.p;

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

  it('should render the "Skills" heading', () => {
    renderSkills();
    const heading = screen.getByText('Skills');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('should render all skill cards with correct titles', () => {
    renderSkills();
    const expectedSkills = [
      'AWS',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Jenkins',
      'GitHub Actions'
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
    const skillCards = screen.getAllByText(/^(AWS|Docker|Kubernetes|Terraform|Jenkins|GitHub Actions)$/);
    expect(skillCards).toHaveLength(6);
  });
});

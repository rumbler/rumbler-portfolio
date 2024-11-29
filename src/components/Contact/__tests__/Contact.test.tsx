import { render, screen } from '@testing-library/react';
import Contact from '../index';

// Mock react-icons/fa
jest.mock('react-icons/fa', () => ({
  FaLinkedin: () => <svg data-testid="icon-linkedin" />,
  FaGithub: () => <svg data-testid="icon-github" />,
  FaEnvelope: () => <svg data-testid="icon-envelope" />
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
    p: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <p {...props}>{children}</p>,
    a: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, href, target, rel, ...props }: any) => (
        <a href={href} target={target} rel={rel} {...props}>{children}</a>
      )
  };
  return {
    __esModule: true,
    default: styled,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('Contact Component', () => {
  const renderContact = () => {
    return render(<Contact />);
  };

  it('should render the "Contact" heading', () => {
    renderContact();
    const heading = screen.getByText('Contact');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('should render LinkedIn link with icon', () => {
    renderContact();
    const linkedinLink = screen.getByText('LinkedIn').closest('a');
    const linkedinIcon = screen.getByTestId('icon-linkedin');

    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/rumbler-soppa');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedinIcon).toBeInTheDocument();
  });

  it('should render GitHub link with icon', () => {
    renderContact();
    const githubLink = screen.getByText('GitHub').closest('a');
    const githubIcon = screen.getByTestId('icon-github');

    expect(githubLink).toHaveAttribute('href', 'https://github.com/rumblersoppa');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubIcon).toBeInTheDocument();
  });

  it('should render Email link with icon', () => {
    renderContact();
    const emailLink = screen.getByText('Email').closest('a');
    const emailIcon = screen.getByTestId('icon-envelope');

    expect(emailLink).toHaveAttribute('href', 'mailto:rumbler.soppa@email.com');
    expect(emailIcon).toBeInTheDocument();
  });

  it('should have correct section id for navigation', () => {
    renderContact();
    const section = document.getElementById('contact');
    expect(section).toBeInTheDocument();
  });
});

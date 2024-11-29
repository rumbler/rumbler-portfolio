import { render, screen } from '@testing-library/react';
import Contact from '../index';

// Mock react-icons/fa
jest.mock('react-icons/fa', () => ({
  FaLinkedin: () => <svg data-testid="icon-linkedin" />,
  FaGithub: () => <svg data-testid="icon-github" />,
  FaEnvelope: () => <svg data-testid="icon-email" />
}));

// Mock styled-components
jest.mock('styled-components', () => {
  const styled = {
    section: () => ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: () => ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: () => ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: () => ({ children, ...props }: any) => <p {...props}>{children}</p>,
    a: () => ({ children, href, target, rel, ...props }: any) => (
      <a href={href} target={target} rel={rel} {...props}>{children}</a>
    )
  };

  styled.section.attrs = () => styled.section;
  styled.div.attrs = () => styled.div;
  styled.h2.attrs = () => styled.h2;
  styled.p.attrs = () => styled.p;
  styled.a.attrs = () => styled.a;

  return {
    __esModule: true,
    default: styled
  };
});

describe('Contact Component', () => {
  it('renders contact section with correct id', () => {
    render(<Contact />);
    const section = document.getElementById('contact');
    expect(section).toBeInTheDocument();
  });

  it('renders contact title', () => {
    render(<Contact />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders contact text', () => {
    render(<Contact />);
    const text = screen.getByText(/I'm always open to new opportunities and collaborations/);
    expect(text).toBeInTheDocument();
  });

  it('renders social media links with correct hrefs', () => {
    render(<Contact />);
    
    const linkedinLink = screen.getByText(/LinkedIn/i).closest('a');
    const githubLink = screen.getByText(/GitHub/i).closest('a');
    const emailLink = screen.getByText(/Email/i).closest('a');

    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/rumbler-soppa-7148b5147');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/rumbler');
    expect(emailLink).toHaveAttribute('href', 'mailto:rumbler.soppa@gmail.com');
  });

  it('renders social media icons', () => {
    render(<Contact />);
    
    expect(screen.getByTestId('icon-linkedin')).toBeInTheDocument();
    expect(screen.getByTestId('icon-github')).toBeInTheDocument();
    expect(screen.getByTestId('icon-email')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import About from '../index';

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
    p: (strings: TemplateStringsArray, ...args: any[]) => 
      ({ children, ...props }: any) => <p {...props}>{children}</p>
  };
  return {
    __esModule: true,
    default: styled,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('About Component', () => {
  const renderAbout = () => {
    return render(<About />);
  };

  it('should render the profile image with correct alt text', async () => {
    renderAbout();
    const image = await screen.findByAltText('Rumbler Soppa');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });

  it('should render the "About Me" heading', async () => {
    renderAbout();
    const heading = await screen.findByText('About Me');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('should render the introduction paragraph', async () => {
    renderAbout();
    const introParagraph = await screen.findByText(/Hi! I'm Rumbler Soppa/);
    expect(introParagraph).toBeInTheDocument();
    expect(introParagraph.tagName).toBe('P');
  });

  it('should render the expertise paragraph', async () => {
    renderAbout();
    const expertiseParagraph = await screen.findByText(/My expertise includes/);
    expect(expertiseParagraph).toBeInTheDocument();
    expect(expertiseParagraph.tagName).toBe('P');
  });

  it('should have correct section id for navigation', () => {
    renderAbout();
    const section = document.getElementById('about');
    expect(section).toBeInTheDocument();
  });
});

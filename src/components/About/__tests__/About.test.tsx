import { render, screen } from '@testing-library/react';
import About from '../index';
import React from 'react';

// Mock styled-components
jest.mock('styled-components', () => ({
  __esModule: true,
  default: {
    section: () => 'section',
    div: () => 'div',
    img: () => 'img',
    h2: () => 'h2',
    p: () => 'p'
  },
  ThemeProvider: ({ children }) => children
}));

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

import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '..';

describe('Header Component', () => {
  beforeEach(() => {
    window.innerWidth = 1024;
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Header />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the logo text', () => {
    render(<Header />);
    
    expect(screen.getByText(/rumbler soppa/i)).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Header />);
    
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Habilidades')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });
});

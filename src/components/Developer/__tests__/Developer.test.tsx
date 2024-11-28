import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Developer from '../index';
import { darkTheme } from '../../../styles/themes';

const renderDeveloper = () => {
  return render(
    <ThemeProvider theme={darkTheme}>
      <Developer />
    </ThemeProvider>
  );
};

describe('Developer Component', () => {
  it('should render the section title', () => {
    renderDeveloper();
    expect(screen.getByText('Development Skills')).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    renderDeveloper();
    expect(screen.getByText('Combining system administration expertise with programming skills to create efficient solutions')).toBeInTheDocument();
  });

  it('should render all skill cards with correct information', () => {
    renderDeveloper();
    
    // Verify skill titles
    expect(screen.getByText('Shell Scripting')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Node.js & JavaScript')).toBeInTheDocument();
    expect(screen.getByText('C++')).toBeInTheDocument();

    // Verify skill descriptions
    expect(screen.getByText(/Advanced system automation/)).toBeInTheDocument();
    expect(screen.getByText(/Automation scripts, Data processing/)).toBeInTheDocument();
    expect(screen.getByText(/Backend development/)).toBeInTheDocument();
    expect(screen.getByText(/Algorithm implementation/)).toBeInTheDocument();

    // Verify progress percentages
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('should render all technical approach items', () => {
    renderDeveloper();
    
    expect(screen.getByText('Test-Driven Development')).toBeInTheDocument();
    expect(screen.getByText('Clean Code practices')).toBeInTheDocument();
    expect(screen.getByText('Documentation-first mindset')).toBeInTheDocument();
    expect(screen.getByText('Continuous learning')).toBeInTheDocument();
  });

  it('should render all skill icons', () => {
    const { container } = renderDeveloper();
    
    // Verifica se todos os ícones estão presentes
    const icons = container.querySelectorAll('svg');
    expect(icons).toHaveLength(8); // 4 skill icons + 4 approach icons
  });

  it('should render the development philosophy section', () => {
    renderDeveloper();
    
    expect(screen.getByText('Development Philosophy')).toBeInTheDocument();
    expect(screen.getByText(/As a developer with a strong DevOps background/)).toBeInTheDocument();
    expect(screen.getByText(/I believe that great software/)).toBeInTheDocument();
  });

  it('should have correct AOS attributes', () => {
    const { container } = renderDeveloper();
    
    // Verifica os atributos AOS nos cartões de habilidades
    const skillCards = container.querySelectorAll('[data-aos="fade-up"]');
    expect(skillCards.length).toBeGreaterThan(0);

    // Verifica os atributos AOS nos itens técnicos
    const technicalItems = container.querySelectorAll('[data-aos="fade-right"]');
    expect(technicalItems.length).toBe(4);
  });
});

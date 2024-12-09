import React, { useState, useEffect } from 'react';
import { HeaderContainer, Logo, NavMenu, NavItem, ThemeToggle, FloatingButton, ThemeSelect } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes, FaDesktop } from 'react-icons/fa';

const Header: React.FC = () => {
  const { currentMode, setThemeMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThemeSelect, setShowThemeSelect] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        setShouldCollapse(window.innerWidth <= 768);
      }, 500);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const handleThemeClick = () => {
    setShowThemeSelect(!showThemeSelect);
  };

  const handleThemeSelect = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    setShowThemeSelect(false);
  };

  const getThemeIcon = () => {
    switch (currentMode) {
      case 'light':
        return <FaSun />;
      case 'dark':
        return <FaMoon />;
      case 'system':
        return <FaDesktop />;
    }
  };

  return (
    <>
      <HeaderContainer $isOpen={isMenuOpen} $shouldCollapse={shouldCollapse}>
        <Logo href="/">Rumbler Soppa</Logo>
        <NavMenu>
          <NavItem href="#pipelines" onClick={handleNavClick}>Pipelines</NavItem>
          <NavItem href="#developer" onClick={handleNavClick}>Developer</NavItem>
          <NavItem href="#skills" onClick={handleNavClick}>Skills</NavItem>
          <NavItem href="#projects" onClick={handleNavClick}>Projects</NavItem>
          <NavItem href="#about" onClick={handleNavClick}>About</NavItem>
          <NavItem href="#contact" onClick={handleNavClick}>Contact</NavItem>
          <ThemeToggle 
            onClick={handleThemeClick} 
            aria-label="Theme selector"
          >
            {getThemeIcon()}
          </ThemeToggle>
          {showThemeSelect && (
            <ThemeSelect>
              <button onClick={() => handleThemeSelect('light')}>
                <FaSun /> Light
              </button>
              <button onClick={() => handleThemeSelect('dark')}>
                <FaMoon /> Dark
              </button>
              <button onClick={() => handleThemeSelect('system')}>
                <FaDesktop /> System
              </button>
            </ThemeSelect>
          )}
        </NavMenu>
      </HeaderContainer>
      {shouldCollapse && (
        <FloatingButton 
          onClick={handleMenuClick}
          $isOpen={isMenuOpen}
          $shouldShow={shouldCollapse}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </FloatingButton>
      )}
    </>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { HeaderContainer, Logo, NavMenu, NavItem, ThemeToggle, FloatingButton } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          <NavItem href="#contacts" onClick={handleNavClick}>Contacts</NavItem>
          <ThemeToggle onClick={toggleTheme} aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </ThemeToggle>
        </NavMenu>
      </HeaderContainer>
      <FloatingButton 
        onClick={handleMenuClick}
        $isOpen={isMenuOpen}
        $shouldShow={shouldCollapse}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </FloatingButton>
    </>
  );
};

export default Header;

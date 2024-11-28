import React from 'react';
import { HeaderContainer, Logo, NavMenu, NavItem, ThemeToggle } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Logo>Rumbler Soppa</Logo>
      <NavMenu>
        <NavItem href="#pipelines">Pipelines</NavItem>
        <NavItem href="#skills">Skills</NavItem>
        <NavItem href="#projects">Projects</NavItem>
        <NavItem href="#about">About</NavItem>
        <NavItem href="#contact">Contact</NavItem>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </NavMenu>
    </HeaderContainer>
  );
};

export default Header;

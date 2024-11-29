import styled from 'styled-components';

interface HeaderProps {
  $isOpen?: boolean;
  $shouldCollapse?: boolean;
}

interface FloatingButtonProps {
  $isOpen?: boolean;
  $shouldShow?: boolean;
}

export const HeaderContainer = styled.header<HeaderProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.secondaryBackground};
  color: ${({ theme }) => theme.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid ${({ theme }) => theme.border};
  height: 70px; 
  transform: translateY(${({ $shouldCollapse, $isOpen }) => 
    $shouldCollapse && !$isOpen ? '-100%' : '0'
  });
  transition: transform 0.3s ease-in-out, background-color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    padding: 1px;
    background: linear-gradient(90deg, #4CAF50, #45a049);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (min-width: 1024px) {
    padding: 1rem 4rem;
    height: 80px;
  }
  
  ${({ $shouldCollapse, $isOpen }) => $shouldCollapse ? `
    flex-direction: column;
    height: auto;
    padding: 1.5rem;
    gap: 1rem;

    ${NavMenu} {
      flex-direction: column;
      width: 100%;
      gap: 0.75rem;
      opacity: ${$isOpen ? '1' : '0'};
      transform: translateY(${$isOpen ? '0' : '-20px'});
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    ${NavItem} {
      width: 100%;
      text-align: center;
    }
  ` : ''}
`;

export const Logo = styled.a`
  ${({ theme }) => theme.titleLarge}
  position: relative;
  display: inline-block;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 1px;

  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #4CAF50, #45a049);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #4CAF50;
    transform: translateY(-1px);

    &::before {
      width: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const NavMenu = styled.nav`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  z-index: 1;

  @media (min-width: 1024px) {
    gap: 1.5rem;
  }
`;

export const NavItem = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.secondaryBackground};
  border: 1px solid ${({ theme }) => theme.border};
  position: relative;
  display: inline-block;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    padding: 1px;
    background: linear-gradient(90deg, #4CAF50, #45a049);
    border-radius: 8px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    color: #4CAF50;
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  z-index: 1;
  background-color: ${({ theme }) => theme.secondaryBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    padding: 1px;
    background: linear-gradient(90deg, #4CAF50, #45a049);
    border-radius: 8px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    color: #4CAF50;
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }

  @media (min-width: 1024px) {
    font-size: 1.2rem;
    padding: 0.75rem;
  }
`;

export const FloatingButton = styled.button<FloatingButtonProps>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.secondaryBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transition: all 0.3s ease;
  display: ${({ $shouldShow }) => ($shouldShow ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 8px;
    padding: 1px;
    background: linear-gradient(90deg, #4CAF50, #45a049);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  svg {
    font-size: 1.3rem;
    color: #4CAF50;
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'none'};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 1024px) {
    width: 3.5rem;
    height: 3.5rem;

    svg {
      font-size: 1.5rem;
    }
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

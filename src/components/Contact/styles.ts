import { default as styled } from 'styled-components';

export const ContactSection = styled.section`
  ${({ theme }) => theme.bodyLarge}
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const ContactTitle = styled.h2`
  ${({ theme }) => theme.headlineLarge}
  color: #4CAF50;
  margin-bottom: 1rem;
  text-align: center;
`;

export const ContactText = styled.p`
  ${({ theme }) => theme.bodyLarge}
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  max-width: 800px;
  margin-bottom: 2rem;
`;

export const ContactButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const ContactButton = styled.a`
  ${({ theme }) => theme.labelLarge}
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.secondaryBackground};
  color: ${({ theme }) => theme.text};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 125px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.border};

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
    font-size: 1.25em;
    color: #4CAF50;
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

  @media (max-width: 768px) {
    width: auto;
    min-width: unset;
    padding: 0.75rem 1rem;
  }
`;

import { default as styled } from 'styled-components';

export const ContactSection = styled.section`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const ContactTitle = styled.h2`
  ${({ theme }) => theme.headlineLarge}
  text-align: center;
  margin-bottom: 1rem;
`;

export const ContactText = styled.p`
  ${({ theme }) => theme.bodyLarge}
  text-align: center;
  max-width: 600px;
`;

export const ContactButton = styled.a`
  ${({ theme }) => theme.labelLarge}
  background-color: ${({ theme }) => theme.buttonBackground};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

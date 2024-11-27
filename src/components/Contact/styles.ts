import styled from 'styled-components';

export const ContactContainer = styled.section`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 4rem;
  text-align: center;

  h2 {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.primary};
  }

  > div {
    display: flex;
    justify-content: center;
    gap: 4rem;
    align-items: flex-start;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.primary};
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 1.5rem;
  }
`;

import styled from 'styled-components';

export const SkillsContainer = styled.section`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 4rem;
  text-align: center;

  h2 {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.primary};
  }
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SkillCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  border: 1px solid ${({ theme }) => theme.border};

  &:hover {
    transform: scale(1.05);
  }
`;

export const SkillIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`;

export const SkillTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
`;

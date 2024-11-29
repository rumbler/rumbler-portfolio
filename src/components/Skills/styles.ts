import styled from 'styled-components';

export const SkillsSection = styled.section`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
`;

export const SkillsTitle = styled.h2`
  ${({ theme }) => theme.headlineLarge}
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.primary};
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SkillCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid ${({ theme }) => theme.border};

  &:hover {
    transform: translateY(-5px);
  }
`;

export const SkillIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`;

export const SkillTitle = styled.h3`
  ${({ theme }) => theme.titleLarge}
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

export const SkillDescription = styled.p`
  ${({ theme }) => theme.bodyLarge}
`;

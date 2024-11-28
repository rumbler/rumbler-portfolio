import styled, { keyframes } from 'styled-components';

const fillProgress = keyframes`
  0% {
    width: 0;
  }
  50% {
    width: calc(var(--progress) - 5%);
  }
  100% {
    width: var(--progress);
  }
`;

export const Section = styled.section`
  padding: 80px 0;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

export const SubTitle = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  margin-bottom: 4rem;
`;

export const SkillCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const SkillIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const SkillTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

export const ProgressContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  height: 8px;
  background: ${({ theme }) => theme.backgroundAlt};
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--progress);
    background: ${({ theme }) => theme.primary};
    animation: ${fillProgress} 1.5s ease-out forwards;
  }

  --progress: ${props => props.$progress}%;
`;

export const ProgressLabel = styled.span`
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.primary};
`;

export const SkillDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  line-height: 1.6;
  margin-top: 1rem;
`;

export const PhilosophySection = styled.div`
  max-width: 800px;
  margin: 6rem auto;
  padding: 0 2rem;
  text-align: center;

  p {
    line-height: 1.8;
    color: ${({ theme }) => theme.text};
    opacity: 0.9;
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const TechnicalList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const TechnicalItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  svg {
    color: ${({ theme }) => theme.primary};
    font-size: 1.25rem;
  }
`;

export const ApproachItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.cardBackground};
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  width: 250px;
  height: 45px;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  
  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.primary};
    flex-shrink: 0;
  }
`;

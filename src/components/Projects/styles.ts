import styled from 'styled-components';

export const ProjectsTitle = styled.h2`
  ${({ theme }) => theme.headlineLarge}
  text-align: center;
  margin-bottom: 2rem;
`;

export const ProjectsSection = styled.section`
  padding: 2rem;
  background-color: ${({ theme }) => theme.secondaryBackground};
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ProjectContent = styled.div`
  padding: 1.5rem;
`;

export const ProjectTitle = styled.h3`
  ${({ theme }) => theme.titleLarge}
  margin-bottom: 0.5rem;
`;

export const ProjectDescription = styled.p`
  ${({ theme }) => theme.bodyLarge}
  margin-bottom: 1rem;
`;

export const ProjectLink = styled.a`
  ${({ theme }) => theme.labelLarge}
  display: inline-block;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

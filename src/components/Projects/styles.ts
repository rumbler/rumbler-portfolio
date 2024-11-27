import styled from 'styled-components';

export const ProjectsContainer = styled.section`
  background-color: ${({ theme }) => theme.secondaryBackground};
  color: ${({ theme }) => theme.text};
  padding: 4rem;
  text-align: center;

  h2 {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.primary};
  }
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: 1px solid ${({ theme }) => theme.border};

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export const ProjectInfo = styled.div`
  padding: 1.5rem;
  text-align: left;

  h3 {
    color: ${({ theme }) => theme.primary};
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.textSecondary};
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    span {
      background-color: ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.primary};
      padding: 0.3rem 0.7rem;
      border-radius: 20px;
      font-size: 0.8rem;
      border: 1px solid ${({ theme }) => theme.primary};
    }
  }
`;

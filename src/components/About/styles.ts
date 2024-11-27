import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 8rem 2rem;
  background: ${props => props.theme.primary};
  
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    padding: 4rem 2rem;
  }
`;

export const ProfileImage = styled.div`
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border: 3px solid ${props => props.theme.secondary};
  transition: transform 0.3s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 900px) {
    width: 250px;
    height: 250px;
  }
`;

export const TextContent = styled.div`
  max-width: 600px;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.secondary};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme.textLight};
    margin-bottom: 1rem;
  }

  @media (max-width: 900px) {
    text-align: center;

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

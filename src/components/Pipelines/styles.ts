import styled from 'styled-components';

export const Container = styled.section`
  padding: 8rem 2rem;
  background: ${props => props.theme.background};

  @media (max-width: 900px) {
    padding: 4rem 1rem;
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 4rem;
  color: ${props => props.theme.secondary};

  @media (max-width: 900px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

export const PipelinesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PipelineCard = styled.div`
  background: ${props => props.theme.primary};
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: ${props => props.theme.secondary};
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: ${props => props.theme.textLight};
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

export const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin-top: auto;
`;

export const TechItem = styled.li`
  background: ${props => props.theme.secondary}22;
  color: ${props => props.theme.secondary};
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
`;

export const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  a {
    color: ${props => props.theme.secondary};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

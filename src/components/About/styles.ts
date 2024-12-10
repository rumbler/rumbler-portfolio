import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 8rem 2rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    padding: 4rem 2rem;
  }
`;

export const ProfileImage = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  background-color: ${({ theme }) => theme.secondaryBackground};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 50%;
    padding: 3px;
    background: linear-gradient(90deg, #4CAF50, #45a049);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  &:hover {
    transform: scale(1.1);
    
    &::before {
      opacity: 1;
    }
  }

  &.spin {
    animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(720deg); }
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
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.primary};
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.text};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: 900px) {
    text-align: center;
    
    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  }
`;

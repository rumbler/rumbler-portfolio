import React, { useRef } from 'react';
import { Container, ProfileImage, TextContent } from './styles';
import profileImage from '../../assets/images/profile.jpg';

const About: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const clickTimestamps = useRef<number[]>([]);
  
  const handleImageClick = () => {
    const now = Date.now();
    clickTimestamps.current.push(now);
    
    // Remove clicks older than 2 seconds
    clickTimestamps.current = clickTimestamps.current.filter(
      timestamp => now - timestamp < 2000
    );
    
    if (clickTimestamps.current.length >= 5) {
      clickTimestamps.current = [];
      const element = imageRef.current;
      if (element) {
        element.classList.add('spin');
        element.addEventListener('animationend', () => {
          element.classList.remove('spin');
        }, { once: true });
      }
    }
  };

  return (
    <Container id="about">
      <ProfileImage ref={imageRef} onClick={handleImageClick}>
        <img src={profileImage} alt="Rumbler Soppa" />
      </ProfileImage>
      <TextContent>
        <h2>About Me</h2>
        <p>
          Hi! I'm Rumbler Soppa, a DevOps Specialist passionate about building and optimizing 
          robust infrastructure solutions. With extensive experience in cloud technologies, 
          automation, and continuous integration/deployment (CI/CD), I help organizations 
          streamline their development and operations processes.
        </p>
        <p>
          My expertise includes working with various cloud platforms, containerization 
          technologies, and infrastructure as code. I'm dedicated to implementing best 
          practices in security, scalability, and reliability while maintaining high 
          performance standards.
        </p>
      </TextContent>
    </Container>
  );
};

export default About;

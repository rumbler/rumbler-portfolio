import React from 'react';
import { Container, ProfileImage, TextContent } from './styles';
import profileImage from '../../assets/images/profile.jpg';

const About: React.FC = () => {
  return (
    <Container id="about">
      <ProfileImage>
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

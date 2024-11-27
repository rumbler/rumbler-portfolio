import React from 'react';
import { ContactContainer, SocialLinks, SocialLink } from './styles';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <ContactContainer id="contact">
      <h2>Contact</h2>
      <SocialLinks>
        <SocialLink href="https://www.linkedin.com/in/rumbler-soppa" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </SocialLink>
        <SocialLink href="https://github.com/rumblersoppa" target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </SocialLink>
        <SocialLink href="mailto:rumbler.soppa@email.com">
          <FaEnvelope /> Email
        </SocialLink>
      </SocialLinks>
    </ContactContainer>
  );
};

export default Contact;

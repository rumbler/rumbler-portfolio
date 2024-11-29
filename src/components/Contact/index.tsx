import React from 'react';
import { ContactSection, ContactTitle, ContactText, ContactButtonsContainer, ContactButton } from './styles';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <ContactSection id="contact">
      <ContactTitle>Contact</ContactTitle>
      <ContactText>
        I'm always open to new opportunities and collaborations. Feel free to reach out if you'd like to work together!
      </ContactText>
      <ContactButtonsContainer>
        <ContactButton href="https://www.linkedin.com/in/rumbler-soppa-7148b5147" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </ContactButton>
        <ContactButton href="https://github.com/rumbler" target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </ContactButton>
        <ContactButton href="mailto:rumbler.soppa@gmail.com">
          <FaEnvelope /> Email
        </ContactButton>
      </ContactButtonsContainer>
    </ContactSection>
  );
};

export default Contact;

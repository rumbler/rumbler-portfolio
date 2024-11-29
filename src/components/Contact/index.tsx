import React from 'react';
import { ContactSection, ContactTitle, ContactText, ContactButton } from './styles';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <ContactSection id="contact">
      <ContactTitle>Contact</ContactTitle>
      <ContactText>
        I'm always open to new opportunities and collaborations.
        Feel free to reach out if you'd like to work together!
      </ContactText>
      <div>
        <ContactButton href="https://www.linkedin.com/in/rumbler-soppa" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </ContactButton>
        <ContactButton href="https://github.com/rumblersoppa" target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </ContactButton>
        <ContactButton href="mailto:rumbler.soppa@email.com">
          <FaEnvelope /> Email
        </ContactButton>
      </div>
    </ContactSection>
  );
};

export default Contact;

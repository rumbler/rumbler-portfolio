import React, { useState, useEffect } from 'react';
import { 
  FaLinkedin, 
  FaGithub,
  FaEnvelope
} from 'react-icons/fa';

const LandingPage: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "I'm DevOps Specialist";

  useEffect(() => {
    let currentText = '';
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setDisplayText(currentText);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section 
      id="home"
      data-testid="landing-section"
      className="relative min-h-screen w-full flex items-center justify-center bg-dark-bg !mt-0 !pt-0"
      style={{
        backgroundImage: 'url(/assets/images/hero-bg12.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full px-8 text-white">
        <div className="flex flex-col items-start">
          <h1 className="text-6xl font-bold mb-4">Rumbler Soppa</h1>
          
          <div className="flex items-center text-2xl mb-8">
            <span data-testid="typing-text">{displayText}</span>
            <span className="animate-blink ml-1">|</span>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href={process.env.REACT_APP_LINKEDIN_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-color transition-colors duration-300"
            >
              <FaLinkedin className="text-3xl" />
            </a>
            <a 
              href={process.env.REACT_APP_GITHUB_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-color transition-colors duration-300"
            >
              <FaGithub className="text-3xl" />
            </a>
            <a 
              href={`mailto:${process.env.REACT_APP_EMAIL_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-color transition-colors duration-300"
            >
              <FaEnvelope className="text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;

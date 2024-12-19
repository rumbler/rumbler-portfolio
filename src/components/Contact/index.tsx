import React from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { animations } from '../../styles/animations';

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-dark-bg flex flex-col"
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 container mx-auto px-4 flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Entre em Contato
            </h2>
            
            <div className="space-y-12">
              <div>
                <p className="text-lg md:text-xl text-zinc-300 mb-6">
                  Você pode me encontrar na web.
                </p>
                <div className="flex justify-center space-x-8">
                  <a
                    href={process.env.REACT_APP_LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-4xl text-zinc-300 hover:text-primary transition-colors duration-300 ${animations.iconHover.rotate}`}
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={process.env.REACT_APP_GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-4xl text-zinc-300 hover:text-primary transition-colors duration-300 ${animations.iconHover.rotate}`}
                    aria-label="GitHub Profile"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>

              <div>
                <p className="text-lg md:text-xl text-zinc-300 mb-6">
                  Se preferir entre em contato:
                </p>
                <div className="flex justify-center space-x-8">
                  <a
                    href={process.env.REACT_APP_EMAIL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-4xl text-zinc-300 hover:text-primary transition-colors duration-300 ${animations.iconHover.rotate}`}
                    aria-label="Email"
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    href={process.env.REACT_APP_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-4xl text-zinc-300 hover:text-primary transition-colors duration-300 ${animations.iconHover.rotate}`}
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

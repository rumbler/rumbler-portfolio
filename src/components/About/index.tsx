import React from 'react';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center bg-dark-bg py-20"
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              DevOps & Especialista em Cloud
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="w-48 md:w-64 h-48 md:h-64 rounded-full 
                              transition-all duration-300 ease-in-out 
                              hover:scale-105 hover:shadow-hover-dark 
                              group cursor-pointer relative p-1">
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-primary 
                                transition-all duration-300 ease-in-out z-10"></div>
                <div className="rounded-full overflow-hidden w-full h-full">
                  <img 
                    src="/assets/images/profile.jpg" 
                    alt="Rumbler Soppa" 
                    className="w-full h-full object-cover 
                               transition-transform duration-300 ease-in-out 
                               group-hover:scale-110"
                  />
                </div>
              </div>
              
              <div className="space-y-6 text-base md:text-xl text-zinc-300 max-w-xl">
                <p>
                  Especialista em tecnologia com expertise em construção de soluções inovadoras 
                  e escaláveis. Minha jornada profissional é marcada pela criação de produtos 
                  tecnológicos que transformam desafios complexos em oportunidades estratégicas 
                  para negócios.
                </p>

                <p>
                  Trabalho com tecnologias de ponta como React, TypeScript, Node.js, Python, Docker, 
                  Kubernetes e GCP, com foco em arquiteturas de microsserviços, automação de 
                  infraestrutura e implementação de práticas ágeis de CI/CD. Minha abordagem 
                  prioriza performance, segurança e experiência do usuário.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

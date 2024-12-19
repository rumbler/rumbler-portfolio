import React from 'react';
import { 
  SiGooglecloud, SiAmazon, SiCloudflare, SiDigitalocean,
  SiDocker, SiTerraform, SiJenkins,
  SiGrafana, SiPrometheus, 
  SiLinux,
  SiElasticsearch, SiCplusplus
} from 'react-icons/si';
import { 
  FaPython, FaNodeJs, FaTerminal, 
  FaBook, FaBrain, FaLaptopCode,
  FaCloudscale
} from 'react-icons/fa';
import { animations } from '../../styles/animations';

const Skills: React.FC = () => {
  const cloudSkills = [
    { icon: <SiGooglecloud />, name: 'Google Cloud', description: 'Infraestrutura e serviços em nuvem' },
    { icon: <SiAmazon />, name: 'AWS', description: 'Serviços de computação em nuvem' },
    { icon: <SiCloudflare />, name: 'Cloudflare', description: 'Segurança e performance web' },
    { icon: <SiDigitalocean />, name: 'DigitalOcean', description: 'Cloud computing simplificada' },
  ];

  const devopsSkills = [
    { icon: <SiDocker />, name: 'Docker', description: 'Containerização de aplicações' },
    { icon: <SiTerraform />, name: 'Terraform', description: 'Infraestrutura como código' },
    { icon: <SiJenkins />, name: 'Jenkins', description: 'Automação de CI/CD' },
    { icon: <SiGooglecloud />, name: 'Cloud Build', description: 'Integração e entrega contínua' },
  ];

  const observabilitySkills = [
    { icon: <SiGrafana />, name: 'Grafana', description: 'Visualização de métricas' },
    { icon: <SiPrometheus />, name: 'Prometheus', description: 'Coleta e monitoramento de métricas' },
    { icon: <SiElasticsearch />, name: 'Elastic Stack', description: 'Análise de logs e rastreamento' },
    { icon: <FaCloudscale />, name: 'OpenTelemetry', description: 'Padronização de instrumentação' },
  ];

  const infrastructureSkills = [
    { icon: <SiLinux />, name: 'Linux', description: 'Administração de sistemas' },
    { icon: <SiGooglecloud />, name: 'Cloud Run', description: 'Computação serverless do GCP' },
    { icon: <SiGooglecloud />, name: 'Cloud CDN', description: 'Distribuição de conteúdo' },
    { icon: <SiGooglecloud />, name: 'Cloud Firestore', description: 'Banco de dados NoSQL' },
  ];

  const developmentSkills = [
    {
      icon: <FaTerminal />,
      title: 'Shell Script',
      progress: 95,
      description: 'Automação avançada de sistemas, gerenciamento de ambiente Unix/Linux'
    },
    {
      icon: <FaPython />,
      title: 'Python',
      progress: 75,
      description: 'Scripts de automação, processamento de dados, integração de API'
    },
    {
      icon: <FaNodeJs />,
      title: 'Node.js',
      progress: 40,
      description: 'Desenvolvimento backend, APIs RESTful, integração frontend'
    },
    {
      icon: <SiCplusplus />,
      title: 'C++',
      progress: 25,
      description: 'Implementação de algoritmos, otimização de desempenho'
    }
  ];

  const technicalApproach = [
    {
      title: 'Práticas de Código Limpo',
      icon: <FaLaptopCode />,
      description: 'Escrever código legível, sustentável e elegante. Convenções de nomenclatura adequadas e funções com responsabilidades únicas.'
    },
    {
      title: 'Documentação Prioritária',
      icon: <FaBook />,
      description: 'Priorizar a documentação como parte fundamental do desenvolvimento. Garante comunicação clara e facilita a integração.'
    },
    {
      title: 'Aprendizado Contínuo',
      icon: <FaBrain />,
      description: 'Compromisso com o desenvolvimento profissional e aprendizado constante de novas tecnologias e metodologias.'
    }
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full flex items-center justify-center bg-dark-bg py-20"
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 max-w-7xl mx-auto w-full px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Minhas Habilidades
          </h2>
        </div>

        {/* Cloud Skills */}
        <div className="mb-16">
          <h3 className="text-2xl text-center mb-8 text-primary">Cloud Computing</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {cloudSkills.map(skill => (
              <div key={skill.name} className={`bg-zinc-800/50 rounded-xl p-6 flex flex-col items-center ${animations.cardHover.lift}`}>
                <div className={`text-4xl text-primary mb-4 ${animations.iconHover.rotate}`}>{skill.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-white">{skill.name}</h4>
                <p className="text-sm text-zinc-400 text-center">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DevOps Skills */}
        <div className="mb-16">
          <h3 className="text-2xl text-center mb-8 text-primary">DevOps</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {devopsSkills.map(skill => (
              <div key={skill.name} className={`bg-zinc-800/50 rounded-xl p-6 flex flex-col items-center ${animations.cardHover.lift}`}>
                <div className={`text-4xl text-primary mb-4 ${animations.iconHover.rotate}`}>{skill.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-white">{skill.name}</h4>
                <p className="text-sm text-zinc-400 text-center">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Observability Skills */}
        <div className="mb-16">
          <h3 className="text-2xl text-center mb-8 text-primary">Observabilidade</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {observabilitySkills.map(skill => (
              <div key={skill.name} className={`bg-zinc-800/50 rounded-xl p-6 flex flex-col items-center ${animations.cardHover.lift}`}>
                <div className={`text-4xl text-primary mb-4 ${animations.iconHover.rotate}`}>{skill.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-white">{skill.name}</h4>
                <p className="text-sm text-zinc-400 text-center">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Skills */}
        <div className="mb-16">
          <h3 className="text-2xl text-center mb-8 text-primary">Infraestrutura</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {infrastructureSkills.map(skill => (
              <div key={skill.name} className={`bg-zinc-800/50 rounded-xl p-6 flex flex-col items-center ${animations.cardHover.lift}`}>
                <div className={`text-4xl text-primary mb-4 ${animations.iconHover.rotate}`}>{skill.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-white">{skill.name}</h4>
                <p className="text-sm text-zinc-400 text-center">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Development Skills */}
        <div className="mb-16">
          <h3 className="text-2xl text-center mb-8 text-primary">Desenvolvimento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developmentSkills.map((skill, index) => (
              <div key={index} className={`bg-zinc-800/50 rounded-xl p-6 ${animations.cardHover.lift}`}>
                <div className={`text-3xl text-primary mb-4 ${animations.iconHover.rotate}`}>
                  {skill.icon}
                </div>
                <h4 className="text-xl font-semibold mb-4 text-white">
                  {skill.title}
                </h4>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-zinc-300">Proficiência</span>
                    <span className="text-sm font-medium text-primary">{skill.progress}%</span>
                  </div>
                  <div className="skill-progress relative h-2 bg-zinc-700 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-zinc-300">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Approach */}
        <div className="mb-16">
          <h3 className="text-2xl text-center mb-8 text-primary">Abordagem Técnica</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalApproach.map((item, index) => (
              <div key={index} className={`bg-zinc-800/50 rounded-xl p-6 ${animations.cardHover.lift}`}>
                <div className={`text-3xl text-primary mb-4 flex justify-center ${animations.iconHover.rotate}`}>
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-center mb-4 text-white">
                  {item.title}
                </h4>
                <p className="text-sm text-zinc-300 text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

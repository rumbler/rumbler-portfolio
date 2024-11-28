import React from 'react';
import { 
  FaPython, FaNodeJs, FaTerminal, 
  FaCheckCircle, FaBook, FaBrain, FaLaptopCode 
} from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';
import {
  Section,
  Title,
  SubTitle,
  SkillsGrid,
  SkillCard,
  ProgressBar,
  ProgressContainer,
  ProgressLabel,
  SkillIcon,
  SkillTitle,
  SkillDescription,
  PhilosophySection,
  TechnicalList,
  TechnicalItem
} from './styles';

const Developer: React.FC = () => {
  const skills = [
    {
      icon: <FaTerminal />,
      title: 'Shell Scripting',
      progress: 95,
      description: 'Advanced system automation, Unix/Linux environment management, Performance optimization scripts, CI/CD pipeline automation'
    },
    {
      icon: <FaPython />,
      title: 'Python',
      progress: 75,
      description: 'Automation scripts, Data processing, API integration, Testing frameworks'
    },
    {
      icon: <FaNodeJs />,
      title: 'Node.js & JavaScript',
      progress: 40,
      description: 'Backend development, RESTful APIs, Frontend integration, Package management'
    },
    {
      icon: <SiCplusplus />,
      title: 'C++',
      progress: 25,
      description: 'Algorithm implementation, Low-level programming, Performance optimization, Systems programming'
    }
  ];

  const technicalApproach = [
    {
      title: 'Test-Driven Development',
      icon: <FaCheckCircle />
    },
    {
      title: 'Clean Code practices',
      icon: <FaLaptopCode />
    },
    {
      title: 'Documentation-first mindset',
      icon: <FaBook />
    },
    {
      title: 'Continuous learning',
      icon: <FaBrain />
    }
  ];

  return (
    <Section id="developer">
      <Title>Development Skills</Title>
      <SubTitle>
        Combining system administration expertise with programming skills to create efficient solutions
      </SubTitle>

      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillCard key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <SkillIcon>{skill.icon}</SkillIcon>
            <SkillTitle>{skill.title}</SkillTitle>
            <ProgressContainer>
              <ProgressBar $progress={skill.progress} />
              <ProgressLabel>{skill.progress}%</ProgressLabel>
            </ProgressContainer>
            <SkillDescription>{skill.description}</SkillDescription>
          </SkillCard>
        ))}
      </SkillsGrid>

      <PhilosophySection data-aos="fade-up">
        <SubTitle>Technical Approach</SubTitle>
        <TechnicalList>
          {technicalApproach.map((item, index) => (
            <TechnicalItem key={index} data-aos="fade-right" data-aos-delay={index * 100}>
              {item.icon} {item.title}
            </TechnicalItem>
          ))}
        </TechnicalList>
      </PhilosophySection>

      <PhilosophySection data-aos="fade-up">
        <SubTitle>Development Philosophy</SubTitle>
        <p>
          As a developer with a strong DevOps background, I approach software development with a unique perspective. 
          My code isn't just about solving immediate problems—it's about creating sustainable, scalable solutions 
          that stand the test of time. I prioritize clean architecture, comprehensive documentation, and automated 
          testing to ensure that my solutions remain maintainable as they evolve.
        </p>
        <p>
          I believe that great software is born from the perfect balance of innovation and reliability. 
          Whether I'm crafting automation scripts or building full-stack applications, I always consider 
          the complete lifecycle of the code: from development and testing to deployment and maintenance.
        </p>
      </PhilosophySection>
    </Section>
  );
};

export default Developer;

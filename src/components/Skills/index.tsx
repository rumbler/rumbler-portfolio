import React from 'react';
import { 
  SkillsContainer, 
  SkillsGrid, 
  SkillCard, 
  SkillIcon, 
  SkillTitle 
} from './styles';
import { 
  FaDocker, 
  FaAws, 
  FaLinux, 
  FaCloud, 
  FaCode, 
  FaServer 
} from 'react-icons/fa';

const Skills: React.FC = () => {
  const skills = [
    { icon: FaDocker, title: 'Docker' },
    { icon: FaAws, title: 'AWS' },
    { icon: FaLinux, title: 'Linux' },
    { icon: FaCloud, title: 'Kubernetes' },
    { icon: FaCode, title: 'CI/CD' },
    { icon: FaServer, title: 'Infrastructure as Code' }
  ];

  return (
    <SkillsContainer id="skills">
      <h2>My Skills</h2>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillCard key={index}>
            <SkillIcon as={skill.icon} />
            <SkillTitle>{skill.title}</SkillTitle>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsContainer>
  );
};

export default Skills;

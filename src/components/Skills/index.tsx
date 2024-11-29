import React from 'react';
import {
  SkillsSection,
  SkillsTitle,
  SkillsGrid,
  SkillCard,
  SkillIcon,
  SkillTitle,
  SkillDescription
} from './styles';
import { FaAws, FaDocker, FaJenkins, FaGithub } from 'react-icons/fa';
import { SiKubernetes, SiTerraform } from 'react-icons/si';

const Skills: React.FC = () => {
  const skills = [
    {
      icon: <FaAws />,
      title: 'AWS',
      description: 'Cloud infrastructure and services'
    },
    {
      icon: <FaDocker />,
      title: 'Docker',
      description: 'Containerization and orchestration'
    },
    {
      icon: <SiKubernetes />,
      title: 'Kubernetes',
      description: 'Container orchestration'
    },
    {
      icon: <SiTerraform />,
      title: 'Terraform',
      description: 'Infrastructure as Code'
    },
    {
      icon: <FaJenkins />,
      title: 'Jenkins',
      description: 'CI/CD pipelines'
    },
    {
      icon: <FaGithub />,
      title: 'GitHub Actions',
      description: 'Automated workflows'
    }
  ];

  return (
    <SkillsSection id="skills">
      <SkillsTitle>Skills</SkillsTitle>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillCard key={index}>
            <SkillIcon as="div">{skill.icon}</SkillIcon>
            <SkillTitle>{skill.title}</SkillTitle>
            <SkillDescription>{skill.description}</SkillDescription>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills;

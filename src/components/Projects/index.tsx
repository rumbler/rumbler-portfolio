import React from 'react';
import {
  ProjectsSection,
  ProjectsTitle,
  ProjectsGrid,
  ProjectCard,
  ProjectImage,
  ProjectContent,
  ProjectTitle,
  ProjectDescription
} from './styles';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Infrastructure Automation',
      description: 'Infrastructure automation project using Terraform and AWS',
      image: '/images/projeto1.png',
      technologies: ['Terraform', 'AWS', 'CI/CD'],
      link: ''
    },
    {
      title: 'Microservices Containerization',
      description: 'Implementation of microservices architecture with Docker and Kubernetes',
      image: '/images/projeto2.png',
      technologies: ['Docker', 'Kubernetes', 'Microservices'],
      link: ''
    },
    {
      title: 'Continuous Integration Pipeline',
      description: 'Development of robust CI/CD pipeline with Jenkins',
      image: '/images/projeto3.png',
      technologies: ['Jenkins', 'GitHub Actions', 'CI/CD'],
      link: ''
    }
  ];

  return (
    <ProjectsSection id="projects">
      <ProjectsTitle>Featured Projects</ProjectsTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <div>
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex}>{tech}</span>
                ))}
              </div>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects;

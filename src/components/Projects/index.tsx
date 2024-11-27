import React from 'react';
import { 
  ProjectsContainer, 
  ProjectGrid, 
  ProjectCard, 
  ProjectImage, 
  ProjectInfo 
} from './styles';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Infrastructure Automation',
      description: 'Infrastructure automation project using Terraform and AWS',
      image: '/images/projeto1.png',
      technologies: ['Terraform', 'AWS', 'CI/CD']
    },
    {
      title: 'Microservices Containerization',
      description: 'Implementation of microservices architecture with Docker and Kubernetes',
      image: '/images/projeto2.png',
      technologies: ['Docker', 'Kubernetes', 'Microservices']
    },
    {
      title: 'Continuous Integration Pipeline',
      description: 'Development of robust CI/CD pipeline with Jenkins',
      image: '/images/projeto3.png',
      technologies: ['Jenkins', 'GitHub Actions', 'CI/CD']
    }
  ];

  return (
    <ProjectsContainer id="projects">
      <h2>Featured Projects</h2>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectInfo>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div>
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex}>{tech}</span>
                ))}
              </div>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectsContainer>
  );
};

export default Projects;

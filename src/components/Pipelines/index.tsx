import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import {
  Container,
  Title,
  PipelinesGrid,
  PipelineCard,
  TechList,
  TechItem,
  Links
} from './styles';

const pipelinesData = [
  {
    title: 'AWS ECS Deployment Pipeline',
    description: 'Automated CI/CD pipeline for containerized applications using AWS ECS, CodePipeline, and CodeBuild. Includes automated testing, security scanning, and blue-green deployment.',
    technologies: ['AWS ECS', 'CodePipeline', 'Docker', 'Terraform', 'GitHub Actions'],
    github: 'https://github.com/yourusername/aws-ecs-pipeline',
    demo: 'https://your-demo-link.com'
  },
  {
    title: 'Kubernetes GitOps Pipeline',
    description: 'GitOps-based deployment pipeline using ArgoCD and Kubernetes. Features automatic sync, rollback capabilities, and monitoring integration.',
    technologies: ['Kubernetes', 'ArgoCD', 'Helm', 'Prometheus', 'Jenkins'],
    github: 'https://github.com/yourusername/k8s-gitops',
    demo: 'https://your-demo-link.com'
  },
  {
    title: 'Multi-Cloud Infrastructure Pipeline',
    description: 'Infrastructure as Code pipeline supporting multiple cloud providers. Includes automated testing of infrastructure changes and security compliance checks.',
    technologies: ['Terraform', 'AWS', 'GCP', 'Azure', 'CircleCI'],
    github: 'https://github.com/yourusername/multi-cloud-pipeline',
    demo: 'https://your-demo-link.com'
  }
];

const Pipelines: React.FC = () => {
  return (
    <Container id="pipelines">
      <Title>CI/CD Pipelines</Title>
      <PipelinesGrid>
        {pipelinesData.map((pipeline, index) => (
          <PipelineCard key={index}>
            <h3>{pipeline.title}</h3>
            <p>{pipeline.description}</p>
            <TechList>
              {pipeline.technologies.map((tech, techIndex) => (
                <TechItem key={techIndex}>{tech}</TechItem>
              ))}
            </TechList>
            <Links>
              <a href={pipeline.github} target="_blank" rel="noopener noreferrer">
                <FaGithub /> Code
              </a>
              <a href={pipeline.demo} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt /> Demo
              </a>
            </Links>
          </PipelineCard>
        ))}
      </PipelinesGrid>
    </Container>
  );
};

export default Pipelines;

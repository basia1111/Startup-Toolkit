import { Project } from '@types';
import React from 'react';
import ProjectCard from '../project/ProjectCard';

type ProjectGridProps = {
  projects: Project[];
  filteredProjects: Project[];
};
const ProjectGrid = ({ projects, filteredProjects }: ProjectGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {filteredProjects &&
        filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} isOwner={false} />
        ))}
    </div>
  );
};

export default ProjectGrid;

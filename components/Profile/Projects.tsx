import React, { useEffect, useState } from 'react';
import CreateProject from '@components/Project/UserProjects/CreateProject';
import { Project } from '@types';
import UserProject from '../Project/UserProjects/UserProject';

const Projects = () => {
  const [projectsList, setProjectsList] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateProjects = (newProject: Project) => {
    setProjectsList((prev) => (prev ? [...prev, newProject] : [newProject]));
  };

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/project/my-projects');
      const data = await response.json();

      if (response.ok) {
        setProjectsList(data.projects || []);
      } else {
        setError(data.message || 'Failed to fetch projects');
      }
    } catch {
      setError('An error occurred while fetching projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={`${
        isLoading
          ? 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent'
          : ''
      } relative space-y-6 overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md`}
    >
      <div>
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-2xl font-light text-white">Projects</h2>
          <CreateProject updateProjects={updateProjects} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projectsList && projectsList.length > 0 ? (
            projectsList.map((project, index) => <UserProject key={index} project={project} />)
          ) : !isLoading ? (
            <div className="text-base font-light text-white">Add Your first project!</div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;

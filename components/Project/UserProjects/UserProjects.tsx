import React, { useEffect, useState } from 'react';
import { Project } from '@types';
import UserProject from './UserProject';

const UserProjects = () => {
  const [projectsList, setProjectsList] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchProjects();
  }, []);

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!projectsList || projectsList.length === 0) {
    return <div>No projects found</div>;
  }

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {projectsList.map((project) => (
        <UserProject key={project.id} project={project} />
      ))}
    </div>
  );
};

export default UserProjects;

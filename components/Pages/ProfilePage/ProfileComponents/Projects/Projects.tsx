import React, { useEffect, useState } from 'react';
import CreateProject from '@components/Pages/ProfilePage/ProfileComponents/Projects/CreateProject';
import { Project } from '@types';
import UserProject from './UserProject';
import { FiPackage } from 'react-icons/fi';

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
    return (
      <div className="rounded-2xl border border-red-500/20 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-3 text-red-400">
          <span className="rounded-full bg-red-500/10 p-2">
            <FiPackage size={20} />
          </span>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className={`${
          isLoading
            ? 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent'
            : ''
        } relative space-y-6 overflow-hidden rounded-2xl border border-purple-500/20 bg-white/5 p-6 backdrop-blur-xl`}
      >
        <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-purple-600/50" />

        <div>
          <div className="flex items-center justify-between pb-6">
            <h2 className="flex items-center gap-3 text-2xl font-light">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <CreateProject updateProjects={updateProjects} />
          </div>

          {projectsList && projectsList.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projectsList.map((project, index) => (
                <UserProject key={index} project={project} setProjectsList={setProjectsList} />
              ))}
            </div>
          ) : !isLoading ? (
            <div className="group relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 to-pink-600/0 transition-opacity duration-300 group-hover:from-purple-600/10 group-hover:to-pink-600/10" />
              <div className="relative flex flex-col items-center justify-center rounded-xl border border-purple-500/20 bg-white/5 p-12 text-center backdrop-blur-sm">
                <span className="mb-4 rounded-full bg-purple-500/10 p-4">
                  <FiPackage size={32} className="text-purple-400" />
                </span>
                <h2 className="mb-2 text-xl font-light text-white">No Projects Yet</h2>
                <p className="text-md max-w-md font-light text-purple-200/60">
                  Start showcasing your work by adding your first project. Click the &quot;New
                  Project&quot; button to begin!
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-purple-600/50" />
      </div>
    </div>
  );
};

export default Projects;

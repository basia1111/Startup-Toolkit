'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@types';
import { FiPackage, FiPlusCircle } from 'react-icons/fi';
import ProjectCard from '@components/project/ProjectCard';
import ModalButton from '@components/common/buttons/ModalButton';
import CreateProjectForm from '../forms/CreateProjectForm';

const Projects = () => {
  const [projectsList, setProjectsList] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        setProjectsList(null);
      }
    } catch {
      console.error('error');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="mt-12 w-full">
      <div className="flex items-center justify-between pb-6">
        <h3 className="mb-6 text-xl font-semibold text-white">Projects</h3>
        <ModalButton
          modalContent={<CreateProjectForm updateProjects={updateProjects} />}
          className="group rounded-md"
        >
          <FiPlusCircle className="group-hover:scale-105" />
          create project
        </ModalButton>
      </div>

      {projectsList && projectsList.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projectsList.map((project, index) => (
            <ProjectCard key={index} project={project} setProjectsList={setProjectsList} />
          ))}
        </div>
      ) : !isLoading ? (
        <div className="flex w-full flex-col items-center justify-center rounded-md border border-white/10 bg-[#161B22]/40 p-10">
          <span className="mb-4 h-16 w-16 rounded-full bg-teal-400/10 p-4">
            <FiPackage size={32} className="text-teal-400" />
          </span>
          <h2 className="mb-2 text-xl font-light text-white">No Projects Yet</h2>
          <p className="text-md text-gray-400 max-w-md text-center font-light">
            Start showcasing your work by adding your first project. Click the &quot;New
            Project&quot; button to begin!
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Projects;

import React, { useEffect, useState } from 'react';
import { Project } from '@types';
import ProjectCard from '../project/ProjectCard';

type ProjectGridProps = {
  projects: Project[];
  filteredProjects: Project[];
};
const ProjectGrid = ({ projects, filteredProjects }: ProjectGridProps) => {
  const itemsPerPage = 1;
  const [totalPages, setTotalPages] = useState<number>();
  const [activePage, setActivePage] = useState<number>(1);

  const calculateTotalPages = () => {
    return Math.ceil(filteredProjects.length / itemsPerPage);
  };
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages && totalPages > 0) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  const resultsFrom = (activePage - 1) * itemsPerPage;
  const resultsTo = activePage * itemsPerPage;

  useEffect(() => {
    const pages = calculateTotalPages();
    setTotalPages(pages);
    setActivePage(1);
  }, [filteredProjects]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {filteredProjects &&
          filteredProjects
            .slice(resultsFrom, resultsTo)
            .map((project) => <ProjectCard key={project.id} project={project} isOwner={false} />)}
      </div>

      <div className="flex items-center justify-center gap-4 pt-8">
        {getPageNumbers().map((pageNum) => (
          <button
            onClick={() => setActivePage(pageNum)}
            key={pageNum}
            className={`rounded-md border px-2 py-1 transition-all hover:text-emerald-300 ${pageNum == activePage ? 'border-white/10 text-emerald-300' : 'text-gray-200 border-transparent'}`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </>
  );
};

export default ProjectGrid;

import ModalButton from '@components/common/buttons/ModalButton';
import DeleteProject from '@components/forms/DeleteProject';
import { Project } from '@types';
import React from 'react';
import { IoTrashBinOutline } from 'react-icons/io5';

type ProjectCardProps = {
  project: Project;
  setProjectsList: React.Dispatch<React.SetStateAction<Project[] | null>>;
};

const ProjectCard = ({ project, setProjectsList }: ProjectCardProps) => {
  return (
    <div
      key={project.id}
      className="group overflow-hidden rounded-lg bg-[#161B22] transition-all duration-200 hover:translate-y-[-4px] hover:bg-[#1C2128]"
    >
      <div className="aspect-video overflow-hidden">
        {project.cover && (
          <img
            src={project.cover || '/images/default-bg.svg'}
            alt={project.title}
            className="h-full w-full object-cover transition-all duration-200 group-hover:scale-105"
          />
        )}

        {!project.cover && (
          <svg width="100%" height="400">
            <defs>
              <linearGradient id="projectBg" x1="0" y1="0" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F766E" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#065F46" stopOpacity="0.1" />
              </linearGradient>
              <pattern id="smallGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#projectBg)" />
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
            <g transform="translate(300,200)">
              <rect x="-60" y="-60" width="120" height="120" fill="rgba(15,118,110,0.1)" />
              <circle cx="40" cy="-40" r="50" fill="rgba(6,95,70,0.1)" />
            </g>
          </svg>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-block rounded-full bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-400">
            {project.category}
          </span>
          <span
            className={`text-sm ${
              project.status === 'Completed' ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {project.status}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
        <p className="text-gray-400 text-sm">{project.description}</p>
      </div>
      <div className="p-4">
        <ModalButton
          modalContent={<DeleteProject setProjectsList={setProjectsList} id={project._id} />}
          className="h-[35px] w-[35px] px-0 py-0"
        >
          <IoTrashBinOutline
            className="text-white/35 transition-colors duration-300 group-hover/btn:text-white/60"
            size="14"
          />
        </ModalButton>
      </div>
    </div>
  );
};

export default ProjectCard;

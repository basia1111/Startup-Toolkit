import React, { useContext, useEffect } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { ModalContext } from '@contexts/ModalContext';
import CreateProjectForm from './CreateProjectForm';
import { Project } from '@types';

type CreateProjectProps = {
  updateProjects: (project: Project) => void;
};

const CreateProject = ({ updateProjects }: CreateProjectProps) => {
  const { openModal, closeModal } = useContext(ModalContext)!;

  return (
    <button
      onClick={() => {
        openModal(<CreateProjectForm closeModal={closeModal} updateProjects={updateProjects} />);
      }}
      className="group flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/30 hover:text-white"
    >
      <FaCirclePlus className="text-base transition-transform group-hover:scale-110" />
      <span>New Project</span>
    </button>
  );
};

export default CreateProject;

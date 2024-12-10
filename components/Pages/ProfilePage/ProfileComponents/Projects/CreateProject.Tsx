import React, { useContext } from 'react';
import { FiPlus } from 'react-icons/fi';
import { ModalContext } from '@contexts/ModalContext';
import CreateProjectForm from './CreateProjectForm';
import { Project } from '@types';

type CreateProjectProps = {
  updateProjects: (project: Project) => void;
};

const CreateProject = ({ updateProjects }: CreateProjectProps) => {
  const { openModal, closeModal } = useContext(ModalContext)!;

  return (
    <div className="group relative">
      <button
        onClick={() => {
          openModal(<CreateProjectForm closeModal={closeModal} updateProjects={updateProjects} />);
        }}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:shadow-purple-900/50"
      >
        <FiPlus />
        <span>New Project</span>
      </button>
    </div>
  );
};

export default CreateProject;

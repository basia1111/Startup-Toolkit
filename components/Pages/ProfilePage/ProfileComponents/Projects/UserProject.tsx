import React, { useContext } from 'react';
import { UserContext } from '@contexts/UserContext';
import { Project } from '@types';
import { IoTrashBinOutline } from 'react-icons/io5';
import { ModalContext } from '@contexts/ModalContext';
import DeleteProject from './DeleteProject';

type UserProjectProps = {
  project: Project;
  setProjectsList: React.Dispatch<React.SetStateAction<Project[] | null>>;
};
const UserProject = ({ project, setProjectsList }: UserProjectProps) => {
  const { user } = useContext(UserContext)!;
  const { openModal, closeModal } = useContext(ModalContext)!;

  const handleClick = () => {
    openModal(
      <DeleteProject setProjectsList={setProjectsList} id={project._id} closeModal={closeModal} />,
    );
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-pink-600/0 blur-md transition-all duration-500 group-hover:from-purple-600/20 group-hover:via-pink-600/20 group-hover:to-purple-600/20" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a27]/80 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1a1a27]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <img
            src={project.cover || '/images/project-cover.png'}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:filter"
            alt={project.title}
          />
        </div>

        <div className="relative space-y-4 p-5">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white/90 transition-colors duration-300 group-hover:text-white">
              {project?.title}
            </h3>
            <p className="line-clamp-2 text-sm text-white/70 transition-colors duration-300 group-hover:text-white/80">
              {project?.description}
            </p>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10 transition-all duration-300 group-hover:border-white/20">
                  <img
                    src={user?.image || '/images/avatar'}
                    className="h-full w-full object-cover"
                    alt={user?.name}
                  />
                </div>
              </div>
              <span className="text-sm text-white/60 transition-colors duration-300 group-hover:text-white/80">
                {user?.name}
              </span>
            </div>

            <button
              onClick={handleClick}
              className="group/btn relative rounded-full p-2 transition-all duration-300 hover:bg-white/5"
            >
              <IoTrashBinOutline className="text-white/35 transition-colors duration-300 group-hover/btn:text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProject;

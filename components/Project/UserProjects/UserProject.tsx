import { UserContext } from '@contexts/UserContext';
import { Project } from '@types';
import React, { useContext } from 'react';

const UserProject = ({ project }: { project: Project }) => {
  const { user } = useContext(UserContext)!;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a27]/80 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/20">
      <div className="relative h-52 overflow-hidden bg-white">
        <img
          src={project.cover}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={project.title}
        />
      </div>
      <div className="relative space-y-3 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-white/90 transition-colors group-hover:text-white">
            {project?.title}
          </h3>
          <p className="line-clamp-2 text-sm text-white/70">{project?.description}</p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10">
              <img
                src={user?.image || '/images/avatar'}
                className="h-full w-full object-cover"
                alt={user?.name}
              />
            </div>
            <span className="text-sm text-white/60">{user?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProject;

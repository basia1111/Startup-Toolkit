import { UserContext } from '@contexts/UserContext';
import { Project } from '@types';
import React, { useContext } from 'react';

const UserProject = ({ project }: { project: Project }) => {
  const { user } = useContext(UserContext)!;
  return (
    <div className="rounded-md bg-white p-4 shadow-md">
      <img src={project.cover} className="h-28 w-full rounded-md object-cover object-center" />
      <h3 className="pt-3 text-lg font-semibold">{project?.title}</h3>
      <p className="text-base">{project?.description}</p>
      <div className="flex items-center gap-1 pt-4">
        <img
          src={user?.image || '/images/default-avatar'}
          className="object center h-6 w-6 rounded-full object-cover shadow-sm"
        />
        <p className="text-sm font-semibold">{user?.name}</p>
      </div>
    </div>
  );
};

export default UserProject;

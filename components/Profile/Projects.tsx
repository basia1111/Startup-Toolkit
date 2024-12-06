import UserProjects from '@components/Project/UserProjects/UserProjects';
import React from 'react';

const Projects = () => {
  return (
    <div className="user-profile-projects mb-10 w-full rounded-xl p-2 md:p-0">
      <h2 className="mb-3 flex flex-col gap-2 pt-4 text-lg font-bold text-gray-900 md:text-2xl">
        Projects
      </h2>
      <UserProjects />
    </div>
  );
};

export default Projects;

'use client';

import React from 'react';
import LeftSidebar from './LeftSidebar';
import Cover from './Cover';
import About from './About';
import Projects from './Projects';
import CreateProject from '../Project/CreateProject';

const Profile = () => {
  return (
    <div className="user-profile grid w-full max-w-[1320px] grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-8">
      <LeftSidebar />
      <div className="md:col-span-2">
        <Cover />
        <About />
        <Projects />
        <CreateProject />
      </div>
    </div>
  );
};

export default Profile;

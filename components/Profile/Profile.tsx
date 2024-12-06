'use client';

import React from 'react';
import Cover from './Cover';
import About from './About';
import Projects from './Projects';
import CreateProject from '../Project/UserProjects/CreateProject';
import ProfileImage from './LeftSidebarComponents/ProfileImage';
import UserDetails from './LeftSidebarComponents/UserDetails';
import SocialLinks from './LeftSidebarComponents/SocialLinks';

const Profile = () => {
  return (
    <div className="user-profile w-full max-w-[1320px] gap-y-8 p-2">
      <div className="bg-softWhite flex flex-col rounded-xl p-2 md:p-6 lg:gap-8">
        <div className="col-span-2">
          <Cover />
          <div className="mt-[-120px] flex flex-col items-center justify-center md:flex-row md:justify-between">
            <div>
              <ProfileImage />
              <UserDetails />
            </div>
            <SocialLinks />
          </div>
          <About />
          <Projects />
          <CreateProject />
        </div>
      </div>
    </div>
  );
};

export default Profile;

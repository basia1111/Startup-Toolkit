import React from 'react';
import { Session } from 'next-auth';
import Achievements from './LeftSidebarComponents/Achievements';
import SocialLinks from './LeftSidebarComponents/SocialLinks';
import ProfileImage from './LeftSidebarComponents/ProfileImage';
import UserDetails from './LeftSidebarComponents/UserDetails';

type LeftSidebar = {
  session: Session;
};

const LeftSidebar = ({ session }: LeftSidebar) => {
  return (
    <div className="md:col-span-1">
      <div className="sticky top-8 flex flex-col items-center rounded-xl bg-white p-6 shadow-md">
        <ProfileImage session={session} />
        <UserDetails session={session} />
        <SocialLinks />
        <Achievements />
      </div>
    </div>
  );
};

export default LeftSidebar;

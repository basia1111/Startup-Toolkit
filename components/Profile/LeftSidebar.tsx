import React from 'react';
import SocialLinks from './LeftSidebarComponents/SocialLinks';
import ProfileImage from './LeftSidebarComponents/ProfileImage';
import UserDetails from './LeftSidebarComponents/UserDetails';

const LeftSidebar = () => {
  return (
    <div className="md:col-span-1">
      <div className="sticky top-8 flex flex-col items-center rounded-xl bg-white p-6 shadow-md">
        <ProfileImage />
        <UserDetails />
        <SocialLinks />
      </div>
    </div>
  );
};

export default LeftSidebar;

import React from 'react';
import { Session } from 'next-auth';
import SocialLinks from './LeftSidebarComponents/SocialLinks';
import ProfileImage from './LeftSidebarComponents/ProfileImage';
import UserDetails from './LeftSidebarComponents/UserDetails';
import { User } from '@types';

type LeftSidebarProps = {
  session: Session;
  user: User;
  updateUser: () => void;
};

const LeftSidebar = ({ session, user, updateUser }: LeftSidebarProps) => {
  return (
    <div className="md:col-span-1">
      <div className="sticky top-8 flex flex-col items-center rounded-xl bg-white p-6 shadow-md">
        <ProfileImage session={session} />
        <UserDetails user={user} updateUser={updateUser} />
        <SocialLinks user={user} />
      </div>
    </div>
  );
};

export default LeftSidebar;

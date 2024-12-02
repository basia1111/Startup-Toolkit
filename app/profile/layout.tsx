import React from 'react';
import { ReactNode } from 'react';

type ProfileLayoutProps = {
  children: ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="font-Inter relative mx-auto w-full px-4">
      <div className="user-profile-wrapper bg-softWhite flex justify-center rounded-2xl p-4 lg:p-10">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;

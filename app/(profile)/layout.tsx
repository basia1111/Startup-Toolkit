import React from 'react';
import { ReactNode } from 'react';

type ProfileLayoutProps = {
  children: ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="profile-wrapper relative -mt-20 min-h-screen w-full bg-[#0D1117] pt-20">
      <div className="profile-gradient-bg absolute inset-0 overflow-hidden">
        <div className="gradient-bg absolute inset-0" />
      </div>

      <div className="profile-content-wrapper relative">{children}</div>
    </div>
  );
};

export default ProfileLayout;

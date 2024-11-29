import React from 'react';
import { ReactNode } from 'react';

type ProfileLayoutProps = {
  children: ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="font-Inter mx-auto w-full px-4">
      <div className="bg-softWhite flex justify-center rounded-2xl p-4 lg:p-10">{children}</div>
    </div>
  );
};

export default ProfileLayout;

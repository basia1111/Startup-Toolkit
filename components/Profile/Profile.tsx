'use client';

import React from 'react';
import { Session } from 'next-auth';
import LeftSidebar from './LeftSidebar';
import Tabs from './Tabs';
import Skills from './Skills';
import Bio from './Bio';
import Projects from './Projects';
import Cover from './Cover';

type ProfileProps = {
  session: Session;
};

const Profile = ({ session }: ProfileProps) => {
  return (
    <div className="user-profile grid w-full max-w-[1320px] grid-cols-1 gap-8 lg:grid-cols-3">
      <LeftSidebar session={session} />
      <div className="md:col-span-2">
        <Cover />
        <Bio />
        <Skills />
        <Tabs />
        <Projects />
      </div>
    </div>
  );
};

export default Profile;

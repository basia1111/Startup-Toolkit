'use client';

import React, { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import Cover from './Cover';
import About from './About';
import Projects from './Projects';
import { Session } from 'next-auth';
import { User } from '@types';

type ProfileProps = {
  session: Session;
  user: User;
};

const Profile = ({ session, user: backendUser }: ProfileProps) => {
  const [user, setUser] = useState<User>(backendUser);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/user/${session?.user?.id}`);
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    if (!backendUser) fetchUser();
  }, [backendUser]);

  return (
    <div className="user-profile grid w-full max-w-[1320px] grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-8">
      <LeftSidebar session={session} user={user} updateUser={fetchUser} />
      <div className="md:col-span-2">
        <Cover user={user} updateUser={fetchUser} />
        <About user={user} updateUser={fetchUser} />
        <Projects />
      </div>
    </div>
  );
};

export default Profile;

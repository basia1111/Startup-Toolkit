'use client';

import React, { useContext } from 'react';
import Cover from './Cover';
import About from './About';
import Projects from './Projects';
import ProfileImage from './ProfileImage';
import UserDetails from './UserDetails';
import SocialLinks from './SocialLinks';
import { UserContext } from '@contexts/UserContext';

const Profile = () => {
  const { isLoading } = useContext(UserContext)!;
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-8">
          <Cover />
          <div className="relative z-10 -mt-32">
            <div
              className={`${
                isLoading
                  ? 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent'
                  : ''
              } relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-md`}
            >
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-end">
                <div className="relative">
                  <ProfileImage />
                </div>
                <div className="flex-grow">
                  <UserDetails />
                </div>
                <SocialLinks />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {['Projects', 'Contributions', 'Following', 'Followers'].map((stat, index) => (
              <div
                key={stat}
                className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md"
              >
                <p className="text-sm text-white/60">{stat}</p>
                <p className="text-2xl font-light text-white">
                  {index === 0 ? '12' : index === 1 ? '234' : '48'}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <About />
            </div>
            <div className="lg:col-span-2">
              <Projects />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

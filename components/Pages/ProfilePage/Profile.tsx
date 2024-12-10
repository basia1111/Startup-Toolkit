'use client';

import React, { useContext } from 'react';
import Cover from './ProfileComponents/Cover';
import About from './ProfileComponents/About';
import Projects from './ProfileComponents/Projects/Projects';
import ProfileImage from './ProfileComponents/ProfileImage';
import UserDetails from './ProfileComponents/UserDetails';
import SocialLinks from './ProfileComponents/SocialLinks';
import { UserContext } from '@contexts/UserContext';

const Profile = () => {
  const { isLoading } = useContext(UserContext)!;

  return (
    <div className="min-h-screen bg-[#1c1c2a]">
      <div className="fixed inset-0 z-0">
        <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute -right-40 top-40 h-72 w-72 rounded-full bg-pink-600/20 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-8">
          <Cover />
          <div className="relative z-10 -mt-32">
            <div
              className={`${
                isLoading
                  ? 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent'
                  : ''
              } relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl`}
            >
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-end">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-300/10 to-pink-300/10 blur" />
                  <ProfileImage />
                </div>
                <div className="flex-grow">
                  <UserDetails />
                </div>
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-xl" />
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {['Projects', 'Contributions', 'Following', 'Followers'].map((stat, index) => (
              <div key={stat} className="group relative cursor-pointer">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30">
                  <p className="text-gray-400 text-sm font-medium">{stat}</p>
                  <p className="mt-2 text-3xl font-light text-white">
                    {index === 0 ? '12' : index === 1 ? '234' : '48'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            <About />
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

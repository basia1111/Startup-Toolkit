import React from 'react';
import { auth } from '@auth';
import { redirect } from 'next/navigation';
import Cover from '@components/user/Cover';
import ProfileImage from '@components/user/ProfileImage';
import Username from '@components/user/Username';
import UserDetails from '@components/user/UserDetails';
import SocialLinks from '@components/user/SocialLinks';
import About from '@components/user/About';
import Projects from '@components/user/Projects';

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect('/login?callbackUrl=/profile');
  }

  return (
    <div className="profile-wrapper relative -mt-20 min-h-screen w-full bg-[#0D1117] pt-20">
      <div className="profile-gradient-bg absolute inset-0 overflow-hidden">
        <div className="gradient-bg absolute inset-0" />
      </div>

      <div className="profile-content-wrapper relative">
        <Cover />
        <div className="profile-content relative mx-auto flex max-w-7xl flex-col items-start px-6 pb-16 lg:-mt-[70px]">
          <div className="profile-header flex flex-col gap-6 lg:w-full lg:flex-row lg:items-end">
            <ProfileImage />
            <div>
              <Username />
              <UserDetails />
            </div>
          </div>
          <SocialLinks />
          <About />
          <Projects />
        </div>
      </div>
    </div>
  );
}

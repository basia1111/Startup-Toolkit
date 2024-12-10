import React from 'react';
import { auth } from '@auth';
import { redirect } from 'next/navigation';
import Profile from '@components/Profile/Profile';

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect('/login?callbackUrl=/profile');
  }

  return (
    <div className="relative min-h-screen w-full bg-[#1c1c2a] pt-20">
      <div className="fixed inset-0">
        <div className="absolute left-1/4 top-[50%] h-[60vh] w-[30vw] rounded-full bg-purple-500/40 blur-[120px]" />
        <div className="absolute left-1/4 top-[20%] h-[40vh] w-[30vw] rounded-full bg-purple-800/20 blur-[120px]" />
        <div className="absolute right-1/4 top-[30%] h-[35vh] w-[25vw] rounded-full bg-blue-800/20 blur-[120px]" />
        <div className="absolute bottom-[20%] left-1/3 h-[45vh] w-[28vw] rounded-full bg-indigo-800/20 blur-[120px]" />
      </div>
      <Profile />
    </div>
  );
}

import React from 'react';
import { auth } from '@auth';
import { redirect } from 'next/navigation';
import Profile from '../../../components/Profile/Profile';

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect('/login?callbackUrl=/profile');
  }

  return <Profile session={session} />;
}

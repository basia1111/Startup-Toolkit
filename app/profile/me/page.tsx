import React from 'react';
import { auth } from '@auth';
import { redirect } from 'next/navigation';
import Profile from '@components/Profile/Profile';
import { findUser } from '@lib/findUser';

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect('/login?callbackUrl=/profile');
  }

  const user = await findUser(session.user.email);

  return <Profile user={user} session={session} />;
}

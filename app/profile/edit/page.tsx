import React from 'react';
import { auth } from '@auth';
import { redirect } from 'next/navigation';
import EditProfilePicrureForm from '@components/EditProfile/EditProfilePicrureForm';

export default async function EditProfilePage() {
  const session = await auth();

  if (!session) {
    redirect('/login?callbackUrl=/profile');
  }

  return <EditProfilePicrureForm />;
}

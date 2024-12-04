'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import EditProfileImageForm from '../EditForms/EditProfileImageForm';
import { UserContext } from '@contexts/UserContext';

const ProfileImage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useContext(UserContext)!;

  return (
    <div className="relative flex flex-col items-center">
      {!isEditing ? (
        <>
          <div className="border-softWhite relative mb-6 h-48 w-48 overflow-hidden rounded-full border-8 shadow-lg">
            <Image
              src={user?.image || '/images/avatar-placeholder.png'}
              alt="profile picture"
              width={192}
              height={192}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div
            onClick={() => {
              setIsEditing(true);
              console.log('click');
            }}
            className="bg-softWhite absolute bottom-6 right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-800 p-2 shadow-md hover:bg-zinc-200"
          >
            <FaCamera className="text-gray" size={12} />
          </div>
        </>
      ) : (
        <EditProfileImageForm setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default ProfileImage;

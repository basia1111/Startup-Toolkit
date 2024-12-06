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
    <div className="font-Inter relative flex flex-col items-center pl-4 md:items-start">
      {!isEditing ? (
        <div className="relative h-28 w-32 md:h-36 md:w-40">
          <div className="border-softWhite mb-6 h-28 w-28 overflow-hidden rounded-full border-4 md:h-36 md:w-36 md:border-8">
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
            className="bg-softWhite absolute bottom-0 right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-800 p-2 shadow-md hover:bg-zinc-200"
          >
            <FaCamera className="text-gray" size={12} />
          </div>
        </div>
      ) : (
        <EditProfileImageForm setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default ProfileImage;

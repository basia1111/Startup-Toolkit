'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import EditProfileImageForm from './EditForms/EditProfileImageForm';
import { UserContext } from '@contexts/UserContext';
import { ModalContext } from '@contexts/ModalContext';

const ProfileImage = () => {
  const { user } = useContext(UserContext)!;
  const { openModal, closeModal } = useContext(ModalContext)!;

  return (
    <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full border-4 border-white/70">
      <Image
        src={user?.image || '/images/avatar.png'}
        alt="profile picture"
        width={160}
        height={160}
        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
        priority
      />
      <div
        onClick={() => openModal(<EditProfileImageForm closeModal={closeModal} />)}
        className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 hover:opacity-100"
      >
        <FaCamera className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};

export default ProfileImage;

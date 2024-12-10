'use client';

import React, { useContext } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { ModalContext } from '@contexts/ModalContext';
import EditUserDataForm from './EditForms/EditUserDataForm';
import { UserContext } from '@contexts/UserContext';

const UserDetails = () => {
  const { openModal, closeModal } = useContext(ModalContext)!;
  const { user } = useContext(UserContext)!;

  return (
    <div className="flex flex-col items-center md:mb-8 md:items-start">
      <h1 className="flex items-center gap-3 pb-1 text-2xl font-light text-white md:text-3xl">
        {user?.name}
        <button
          onClick={() => openModal(<EditUserDataForm closeModal={closeModal} />)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/50 transition-all hover:bg-black/70 md:h-8 md:w-8"
        >
          <FaPencilAlt size="14" className="text-white/60" />
        </button>
      </h1>

      <p className="ms:text-lg text-msfont-light pb-3 text-white/80">{user?.professionalTitle}</p>

      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/70 md:text-sm">
        <FaLocationDot />
        <span>{user?.city}</span>
      </div>
    </div>
  );
};

export default UserDetails;

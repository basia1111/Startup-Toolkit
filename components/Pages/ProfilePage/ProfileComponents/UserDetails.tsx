'use client';

import React, { useContext } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { ModalContext } from '@contexts/ModalContext';
import EditUserDataForm from '../EditForms/EditUserDataForm';
import { UserContext } from '@contexts/UserContext';

const UserDetails = () => {
  const { openModal, closeModal } = useContext(ModalContext)!;
  const { user } = useContext(UserContext)!;

  return (
    <div className="flex flex-col items-center md:mb-8 md:items-start">
      <h1 className="flex items-center gap-3 pb-1 text-2xl font-light text-white md:text-3xl">
        <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          {user?.name}
        </span>
        <button
          onClick={() => openModal(<EditUserDataForm closeModal={closeModal} />)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-purple-500/40 hover:bg-white/10"
        >
          <FaPencilAlt size="14" className="text-purple-400" />
        </button>
      </h1>

      <p className="pb-3 text-lg font-light text-purple-200/80">{user?.professionalTitle}</p>

      <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-white/5 px-4 py-1.5 text-sm text-purple-200/80 backdrop-blur-sm">
        <FaLocationDot className="text-purple-400" />
        <span>{user?.city}</span>
      </div>
    </div>
  );
};

export default UserDetails;

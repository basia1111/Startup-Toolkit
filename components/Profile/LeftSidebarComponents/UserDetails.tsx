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

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="flex flex-col items-center pt-6 md:items-start">
      <h1 className="mb-1 flex items-center gap-2 text-xl font-bold text-gray-900 md:text-2xl">
        {user.name}
        <FaPencilAlt
          onClick={() => openModal(<EditUserDataForm closeModal={closeModal} />)}
          size={12}
          className="cursor-pointer text-neutral-400 transition-all hover:text-neutral-600"
        />
      </h1>
      <p className="text-gray mb-4 text-center text-sm md:text-base">{user.professionalTitle}</p>

      <div className="mb-6 flex items-center text-sm text-neutral-400">
        <FaLocationDot className="mr-1 text-neutral-400" />
        <span>{user.city}</span>
      </div>
    </div>
  );
};

export default UserDetails;

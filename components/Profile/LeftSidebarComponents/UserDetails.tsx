'use client';

import React, { useContext } from 'react';
import { FaPen } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/sl';
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
    <>
      <h1 className="mb-4 flex items-center gap-2 pl-2 text-2xl font-bold text-gray-900">
        {user.name}
        <FaPen
          onClick={() => openModal(<EditUserDataForm closeModal={closeModal} />)}
          size={12}
          className="text-mediumGray hover:text-gray cursor-pointer transition-all"
        />
      </h1>
      <p className="text-mediumGray mb-1 pl-2 text-center">{user.professionalTitle}</p>

      <div className="text-mediumGray mb-6 flex items-center text-sm">
        <SlLocationPin className="text-orange mr-2" />
        <span>{user.city}</span>
      </div>
    </>
  );
};

export default UserDetails;

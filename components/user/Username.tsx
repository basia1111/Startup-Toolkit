'use client';

import React, { useContext } from 'react';
import { UserContext } from '@contexts/UserContext';
import ModalButton from '@components/common/buttons/ModalButton';
import { FaPencilAlt } from 'react-icons/fa';
import EditUserDataForm from '../forms/EditUserDataForm';

const Username = () => {
  const { user } = useContext(UserContext)!;

  return (
    <div className="relative flex gap-2">
      <h1 className="text-2xl font-bold text-white lg:text-3xl">{user?.name}</h1>
      <ModalButton modalContent={<EditUserDataForm />} className="h-[35px] w-[35px] px-0 py-0">
        <FaPencilAlt size="12" />
      </ModalButton>
    </div>
  );
};

export default Username;

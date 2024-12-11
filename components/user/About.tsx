'use client';

import React, { useContext } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import EditUserAboutForm from '../forms/EditUserAboutForm';
import { UserContext } from '@contexts/UserContext';
import ModalButton from '@components/common/buttons/ModalButton';

const About = () => {
  const { user } = useContext(UserContext)!;

  return (
    <div className="mt-8 w-full">
      <div className="relative flex gap-2">
        <h3 className="text-xl font-semibold text-white">About</h3>
        <ModalButton modalContent={<EditUserAboutForm />} className="h-[30px] w-[30px] px-0 py-0">
          <FaPencilAlt size="10" />
        </ModalButton>
      </div>
      <p className="text-gray-400 mt-2 leading-relaxed">{user?.about}</p>
    </div>
  );
};

export default About;

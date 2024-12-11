'use client';

import React, { useContext } from 'react';
import { UserContext } from '@contexts/UserContext';
import { FiMapPin } from 'react-icons/fi';

const UserDetails = () => {
  const { user } = useContext(UserContext)!;

  return (
    <div className="text-gray-400 mt-2 flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      <span>{user?.professionalTitle}</span>
      <span className="hidden lg:inline">•</span>
      <div className="flex items-center gap-2">
        <FiMapPin className="h-4 w-4" />
        {user?.city}
      </div>
    </div>
  );
};

export default UserDetails;

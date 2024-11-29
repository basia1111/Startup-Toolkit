import React from 'react';
import { Session } from 'next-auth';
import { FaPen } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/sl';

type UserDetails = {
  session: Session;
};

const UserDetails = ({ session }: UserDetails) => {
  return (
    <>
      <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold text-gray-900">
        {session.user?.name} <FaPen size={14} className="text-gray" />
      </h1>
      <p className="text-mediumGray mb-1 text-center font-normal">CEO of company</p>

      <div className="text-mediumGray mb-6 flex items-center text-sm">
        <SlLocationPin className="text-orange mr-2" />
        <span>Warsaw, Poland</span>
      </div>
    </>
  );
};

export default UserDetails;

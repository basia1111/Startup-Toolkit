import React, { useState } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import EditProfileCoverForm from './EditForms/EditProfileCoverForm';
import { User } from '@types';

type CoverProps = {
  user: User | null;
  updateUser: () => void;
};

const Cover = ({ user, updateUser }: CoverProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {!isEditing ? (
        <div className="relative">
          <img
            src={user?.coverImage || '/images/cover-placeholder.png'}
            className="user-profile-cover relative mb-8 h-44 w-full rounded-xl object-cover"
          />
          <div
            onClick={() => {
              console.log('click');
              setIsEditing(true);
            }}
            className="bg-softWhite absolute bottom-6 right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-opacity-50 p-2 shadow-md backdrop-blur-sm hover:bg-opacity-70"
          >
            <FaPaintBrush className="text-gray" size={12} />
          </div>
        </div>
      ) : (
        <EditProfileCoverForm updateUser={updateUser} setIsEditing={setIsEditing} user={user} />
      )}
    </div>
  );
};

export default Cover;

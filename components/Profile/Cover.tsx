import React, { useContext, useState } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import EditProfileCoverForm from './EditForms/EditProfileCoverForm';
import { UserContext } from '@contexts/UserContext';

const Cover = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext)!;

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
              setIsEditing(true);
            }}
            className="bg-softWhite absolute bottom-6 right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-opacity-50 p-2 shadow-md backdrop-blur-sm hover:bg-opacity-70"
          >
            <FaPaintBrush className="text-gray" size={12} />
          </div>
        </div>
      ) : (
        <EditProfileCoverForm setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Cover;

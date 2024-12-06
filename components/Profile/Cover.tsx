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
            className="user-profile-cover relative mb-8 h-44 w-full rounded-xl object-cover md:h-60"
          />
          <div
            onClick={() => {
              setIsEditing(true);
            }}
            className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/40"
          >
            <FaPaintBrush className="text-gary text-xl" />
          </div>
        </div>
      ) : (
        <EditProfileCoverForm setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Cover;

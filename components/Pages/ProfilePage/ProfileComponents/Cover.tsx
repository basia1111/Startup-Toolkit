import React, { useContext, useState } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import EditProfileCoverForm from '../EditForms/EditProfileCoverForm';
import { UserContext } from '@contexts/UserContext';

const Cover = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext)!;

  return (
    <div>
      {!isEditing ? (
        <div className="relative rounded-xl bg-white">
          <img
            src={user?.coverImage || '/images/bg.png'}
            className="user-profile-cover relative mb-8 h-44 w-full rounded-xl object-cover md:h-60"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-violet-300/20 to-violet-300/60" />
          <button
            onClick={() => {
              setIsEditing(true);
            }}
            className="absolute right-4 top-4 cursor-pointer rounded-full border border-white/20 bg-black/20 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-black/40"
          >
            <FaPaintBrush size="14" className="text-xl text-white/70" />
          </button>
        </div>
      ) : (
        <EditProfileCoverForm setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Cover;

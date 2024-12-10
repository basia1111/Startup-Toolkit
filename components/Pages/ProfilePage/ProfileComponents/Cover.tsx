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
        <div className="group relative">
          <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl">
            <img
              src={user?.coverImage || '/images/cover-placeholder.png'}
              className="relative h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-60"
              alt="Profile Cover"
            />

            <div className="absolute inset-0 top-[50%] h-1/2 bg-gradient-to-b from-purple-900/0 via-purple-900/10 to-purple-900/30" />
            <button
              onClick={() => setIsEditing(true)}
              className="group/btn absolute right-4 top-4 flex items-center gap-2 rounded-full border border-purple-500/20 bg-white/5 px-4 py-2 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-500/40 hover:bg-white/10"
            >
              <FaPaintBrush className="text-purple-400 transition-colors duration-300 group-hover/btn:text-white" />
              <span className="hidden text-sm font-light text-purple-200/80 transition-colors duration-300 group-hover/btn:text-white md:block">
                Edit Cover
              </span>
            </button>

            <div className="absolute left-0 h-[1px] w-full bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-purple-600/50" />
          </div>
        </div>
      ) : (
        <EditProfileCoverForm setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Cover;

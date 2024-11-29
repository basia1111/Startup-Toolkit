import React from 'react';
import { GoIssueClosed } from 'react-icons/go';

const Achievements = () => {
  return (
    <div className="user-profile-achievements w-full rounded-xl bg-black p-6">
      <h3 className="mb-4 flex items-center text-xl font-semibold text-white">
        <GoIssueClosed className="text-orange mr-3" />
        Achievements
      </h3>
      <ul className="space-y-4">
        <li className="flex items-center">
          <span className="bg-orange mr-3 h-2 w-2 rounded-full"></span>
          <span className="text-sm text-white">Achievement 1</span>
        </li>
        <li className="flex items-center">
          <span className="bg-orange mr-3 h-2 w-2 rounded-full"></span>
          <span className="text-sm text-white">Another achievement</span>
        </li>
        <li className="flex items-center">
          <span className="bg-orange mr-3 h-2 w-2 rounded-full"></span>
          <span className="text-sm text-white">Third achievement</span>
        </li>
      </ul>
    </div>
  );
};

export default Achievements;

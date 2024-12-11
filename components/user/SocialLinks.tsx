'use client';

import { UserContext } from '@contexts/UserContext';
import React, { useContext } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';

const SocialLinks = () => {
  const { user } = useContext(UserContext)!;

  return (
    <div className="mt-6 flex w-full justify-between border-b border-[#21262D] pb-6">
      <div className="flex gap-4">
        {user?.socialmedia?.linkedIn && (
          <a
            href={user.socialmedia.linkedIn}
            className="text-gray-400 flex items-center gap-2 transition-colors hover:text-teal-400"
          >
            <FiLinkedin className="h-5 w-5" />
            <span>LinkedIn</span>
          </a>
        )}
        {user?.socialmedia?.twitter && (
          <a
            href={user.socialmedia.twitter}
            className="text-gray-400 flex items-center gap-2 transition-colors hover:text-teal-400"
          >
            <FiTwitter className="h-5 w-5" />
            <span>Twitter</span>
          </a>
        )}
        {user?.socialmedia?.github && (
          <a
            href={user?.socialmedia?.github}
            className="text-gray-400 flex items-center gap-2 transition-colors hover:text-teal-400"
          >
            <FiGithub className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        )}
      </div>

      <button className="group flex items-center gap-2 rounded-md border border-white/10 bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2 text-white hover:from-teal-500 hover:to-emerald-500">
        <FiMail className="transition-all group-hover:scale-105" />
        Contact
      </button>
    </div>
  );
};

export default SocialLinks;

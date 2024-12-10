import { UserContext } from '@contexts/UserContext';
import React, { useContext } from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const SocialLinks = () => {
  const { user } = useContext(UserContext)!;

  return (
    <div className="user-profile-social-links mb-6 flex justify-center space-x-4 md:justify-end md:py-4">
      {user?.socialmedia?.twitter && (
        <a
          key="twitter"
          href={user.socialmedia.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/25 transition-all duration-300 hover:scale-110 hover:border-white/20"
        >
          <FaTwitter
            size={24}
            className="text-white/70 transition-all duration-300 group-hover:text-white"
          />
        </a>
      )}
      {user?.socialmedia?.linkedIn && (
        <a
          key="linkedin"
          href={user.socialmedia.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/25 transition-all duration-300 hover:scale-110 hover:border-white/20"
        >
          <FaLinkedin
            size={24}
            className="text-white/70 transition-all duration-300 group-hover:text-white"
          />
        </a>
      )}
      {user?.socialmedia?.github && (
        <a
          key="github"
          href={user.socialmedia.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/25 transition-all duration-300 hover:scale-110 hover:border-white/20"
        >
          <FaGithub
            size={24}
            className="text-white/70 transition-all duration-300 group-hover:text-white"
          />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;

import { UserContext } from '@contexts/UserContext';
import React, { useContext } from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const SocialLinks = () => {
  const { user } = useContext(UserContext)!;

  const socialButtonClass = `
    group flex h-11 w-11 items-center justify-center rounded-full 
    border border-purple-500/20 bg-white/5 backdrop-blur-sm
    transition-all duration-300 hover:scale-110 hover:border-purple-500/40
    hover:bg-white/10 relative overflow-hidden
  `;

  const iconClass =
    'text-purple-400 transition-all duration-300 group-hover:text-white relative z-10';

  return (
    <div className="mb-6 flex justify-center space-x-4 md:justify-end md:py-4">
      {user?.socialmedia?.twitter && (
        <a
          href={user.socialmedia.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={socialButtonClass}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 transition-opacity duration-300 group-hover:from-purple-600/20 group-hover:to-pink-600/20" />
          <FaTwitter size={22} className={iconClass} />
        </a>
      )}
      {user?.socialmedia?.linkedIn && (
        <a
          href={user.socialmedia.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className={socialButtonClass}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 transition-opacity duration-300 group-hover:from-purple-600/20 group-hover:to-pink-600/20" />
          <FaLinkedin size={22} className={iconClass} />
        </a>
      )}
      {user?.socialmedia?.github && (
        <a
          href={user.socialmedia.github}
          target="_blank"
          rel="noopener noreferrer"
          className={socialButtonClass}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 transition-opacity duration-300 group-hover:from-purple-600/20 group-hover:to-pink-600/20" />
          <FaGithub size={22} className={iconClass} />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;

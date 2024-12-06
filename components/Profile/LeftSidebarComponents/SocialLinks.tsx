import { UserContext } from '@contexts/UserContext';
import React, { useContext } from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const SocialLinks = () => {
  const { user } = useContext(UserContext)!;

  return (
    <div className="user-profile-social-links mb-6 flex justify-end space-x-4 py-4 md:pt-[120px]">
      {user?.socialmedia?.twitter && (
        <a
          key="twitter"
          href={user.socialmedia.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray hover:text-accent transition-colors"
        >
          <FaTwitter size={24} />
        </a>
      )}
      {user?.socialmedia?.linkedIn && (
        <a
          key="linkedin"
          href={user.socialmedia.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray hover:text-accent transition-colors"
        >
          <FaLinkedin size={24} />
        </a>
      )}
      {user?.socialmedia?.github && (
        <a
          key="github"
          href={user.socialmedia.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray hover:text-accent transition-colors"
        >
          <FaGithub size={24} />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;

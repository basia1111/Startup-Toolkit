import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { IconType } from 'react-icons';

const socialLinks = {
  linkedin: 'https://linkedin.com/in/johndoe',
  github: 'https://github.com/johndoe',
  twitter: 'https://twitter.com/johndoe',
};

const SocialLinks = () => {
  return (
    <div className="user-profile-social-links mb-6 flex space-x-4">
      {Object.entries(socialLinks).map(([platform, link]) => {
        const IconComponent: IconType | undefined = {
          linkedin: FaLinkedin,
          github: FaGithub,
          twitter: FaTwitter,
        }[platform];
        if (!IconComponent) {
          return null;
        }
        return (
          <a
            key={platform}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-blue-600"
          >
            <IconComponent size={24} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;

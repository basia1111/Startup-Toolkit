import React, { useContext } from 'react';
import { FaPen } from 'react-icons/fa';
import EditUserAboutForm from './EditForms/EditUserAboutForm';
import { ModalContext } from '@contexts/ModalContext';
import { UserContext } from '@contexts/UserContext';

const About = () => {
  const { openModal, closeModal } = useContext(ModalContext)!;
  const { user } = useContext(UserContext)!;

  return (
    <div className="user-profile-bio rounded-xl">
      <h2 className="text-gray mb-4 flex items-center text-2xl font-semibold">
        About Me
        <FaPen
          onClick={() => openModal(<EditUserAboutForm closeModal={closeModal} />)}
          size={12}
          className="text-mediumGray hover:text-gray cursor-pointer transition-all"
        />
      </h2>
      <p className="leading-relaxed text-gray-700">{user?.about || null}</p>
    </div>
  );
};

export default About;

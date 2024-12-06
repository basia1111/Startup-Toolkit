import React, { useContext } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import EditUserAboutForm from './EditForms/EditUserAboutForm';
import { ModalContext } from '@contexts/ModalContext';
import { UserContext } from '@contexts/UserContext';

const About = () => {
  const { openModal, closeModal } = useContext(ModalContext)!;
  const { user } = useContext(UserContext)!;

  return (
    <div className="user-profile-bio rounded-xl p-2 md:p-0">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900 md:text-2xl">
        About Me
        <FaPencilAlt
          onClick={() => openModal(<EditUserAboutForm closeModal={closeModal} />)}
          size={12}
          className="hover:text-gray cursor-pointer text-neutral-400 transition-all"
        />
      </h2>
      <p className="leading-relaxed text-gray-700">{user?.about || null}</p>
    </div>
  );
};

export default About;

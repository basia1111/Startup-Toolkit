import React, { useContext } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import EditUserAboutForm from './EditForms/EditUserAboutForm';
import { ModalContext } from '@contexts/ModalContext';
import { UserContext } from '@contexts/UserContext';

const About = () => {
  const { openModal, closeModal } = useContext(ModalContext)!;
  const { user, isLoading } = useContext(UserContext)!;

  return (
    <div
      className={`${
        isLoading
          ? 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent'
          : ''
      } relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md`}
    >
      <div className="space-y-4">
        <h2 className="flex items-center gap-3 text-2xl font-light text-white">
          About
          <button
            onClick={() => openModal(<EditUserAboutForm closeModal={closeModal} />)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-white/20"
          >
            <FaPencilAlt size={12} className="text-white/60" />
          </button>
        </h2>
        <p className="max-w-3xl font-light leading-relaxed text-white/70">{user?.about || null}</p>
      </div>
    </div>
  );
};

export default About;

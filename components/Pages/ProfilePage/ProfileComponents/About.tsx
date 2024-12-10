import React, { useContext } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import EditUserAboutForm from '../EditForms/EditUserAboutForm';
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
      } relative overflow-hidden rounded-2xl border border-purple-500/20 bg-white/5 p-6 backdrop-blur-xl`}
    >
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-purple-600/50" />
      <div className="space-y-4">
        <h2 className="flex items-center gap-3 text-2xl font-light">
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            About
          </span>
          <button
            onClick={() => openModal(<EditUserAboutForm closeModal={closeModal} />)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-purple-500/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-purple-500/40"
          >
            <FaPencilAlt size={12} className="text-purple-400" />
          </button>
        </h2>
        <p className="max-w-3xl font-light leading-relaxed text-purple-200/80">
          {user?.about || null}
        </p>
      </div>
    </div>
  );
};

export default About;

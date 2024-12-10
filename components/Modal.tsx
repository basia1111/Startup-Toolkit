'use client';

import React from 'react';
import { ModalContext } from '@contexts/ModalContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const Modal = () => {
  const { isOpen, closeModal, modalContent } = useContext(ModalContext)!;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const modalOverlayVariants = {
    initial: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    close: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  const modalVariants = {
    initial: { scale: 0.95, opacity: 0, y: 10 },
    open: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    close: {
      scale: 0.95,
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalOverlayVariants}
          initial="initial"
          animate="open"
          exit="close"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm md:p-6"
        >
          <div
            className="absolute inset-0 bg-black/40"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(255,255,255,0.03) 0.5px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-2xl rounded-2xl border border-white/20 bg-white/95 p-8 shadow-lg backdrop-blur-sm md:min-w-[40%]"
          >
            <div className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

            <button
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black/5 transition-all duration-300 hover:scale-110 hover:bg-black/10"
            >
              <IoMdClose className="text-black/70" size={16} />
            </button>

            <div className="relative mt-4 max-h-[80vh] overflow-y-auto p-2">{modalContent}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

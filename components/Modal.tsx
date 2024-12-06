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
    open: { opacity: 1, transition: { duration: 0.2 } },
    close: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    initial: { scale: 0.8, opacity: 0 },
    open: { scale: 1, opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    close: { scale: 0.8, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalOverlayVariants}
          initial="initial"
          animate="open"
          exit="close"
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 md:p-6"
        >
          <motion.div
            variants={modalVariants}
            className="modal-content-wrapper relative w-full max-w-2xl rounded-xl bg-white p-4 shadow-xl md:min-w-[40%] md:p-6"
          >
            <IoMdClose
              onClick={closeModal}
              className="absolute right-6 top-6 cursor-pointer text-gray-700 transition hover:text-gray-500"
            />
            <div className="modal-content pt-6">{modalContent}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

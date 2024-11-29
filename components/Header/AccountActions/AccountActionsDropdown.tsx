'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { signOut } from 'next-auth/react';

const AccountActionsDropdown = () => {
  const [actionDropdown, setActionDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActionDropdown((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setActionDropdown(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownVariants = {
    initial: {
      y: -5,
      opacity: 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div ref={dropdownRef} className="relative">
      <PiDotsThreeVerticalBold onClick={handleDropdown} />

      <AnimatePresence>
        {actionDropdown && (
          <motion.div
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute right-2 top-10 flex w-auto flex-col gap-2 rounded bg-white p-4 pr-20 text-left text-black shadow-lg"
          >
            <Link href="/profile/me" className="hover:text-orange">
              Profile
            </Link>
            <p className="hover:text-orange cursor-pointer" onClick={handleLogout}>
              Logout
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountActionsDropdown;

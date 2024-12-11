import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { IoLogOutSharp } from 'react-icons/io5';

type MobileMenuProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExiting: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  isExiting: boolean;
};

const MobileMenu = ({ isMenuOpen, isExiting, setIsMenuOpen, setIsExiting }: MobileMenuProps) => {
  const { data: session } = useSession();

  const handleClick = () => {
    setIsExiting(false);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const menuWrapperVariants = {
    initial: {
      height: 0,
      opacity: 0,
      clipPath: 'inset(0% 0% 100% 0%)',
      transition: {
        duration: 0.2,
        when: 'beforeChildren',
        ease: 'easeInOut',
      },
    },
    animate: {
      height: '100vh',
      opacity: 1,
      clipPath: 'inset(0% 0 0 0)',
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      clipPath: 'inset(0% 0% 100% 0%)',
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        when: 'afterChildren',
      },
    },
  };

  const menuLinksVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            variants={menuWrapperVariants}
            initial="initial"
            animate="animate"
            exit={isExiting ? 'exit' : ''}
            className="fixed inset-0 z-40 flex border-white/10 bg-black/95 p-6 backdrop-blur-md"
          >
            <motion.ul className="relative flex w-full flex-col gap-8 px-4 pt-32">
              <motion.li
                variants={menuLinksVariants}
                className="text-3xl font-light text-white transition-colors hover:text-purple-300"
                onClick={handleClick}
              >
                <Link href="/">Home</Link>
              </motion.li>
              <motion.li
                variants={menuLinksVariants}
                className="text-3xl font-light text-white transition-colors hover:text-purple-300"
                onClick={handleClick}
              >
                <Link href="/projects">Projects</Link>
              </motion.li>
              <motion.div
                variants={menuLinksVariants}
                className="absolute bottom-4 flex w-full flex-col items-center justify-center border pt-6"
              >
                {session?.user?.name ? (
                  <div className="flex items-center gap-4">
                    <Link
                      href="/profile/me"
                      className="flex items-center gap-4 text-white transition-colors hover:text-purple-300"
                      onClick={handleClick}
                    >
                      <img
                        src={session.user.image || '/images/avatar-placeholder.png'}
                        alt="profile picture"
                        width={30}
                        height={30}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="text-lg">{session.user.name}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-white transition-colors hover:text-white"
                    >
                      <IoLogOutSharp size={20} />
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-lg bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700"
                    onClick={handleClick}
                  >
                    Sign in
                  </Link>
                )}
              </motion.div>
            </motion.ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

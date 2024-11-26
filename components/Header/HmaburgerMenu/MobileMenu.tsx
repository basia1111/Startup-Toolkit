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
        when: 'beforeChildren', // Ensures children animate only after the container is visible
        ease: 'easeInOut',
      },
    },
    animate: {
      height: '100%',
      opacity: 1,
      clipPath: 'inset(0% 0 0 0)', // Reveal the menu from top to bottom
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
        when: 'afterChildren', // This makes sure the children exit first
      },
    },
  };

  // Menu links animation
  const menuLinksVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.ul
          variants={menuWrapperVariants}
          initial="initial"
          animate="animate"
          exit={isExiting ? 'exit' : ''}
          id="menu-links-wrapper"
          className="menu-links-wrapper fixed left-0 top-0 z-40 flex h-screen w-full flex-col items-center justify-center gap-8 bg-white p-4 text-xl font-light text-black lg:relative lg:hidden lg:h-auto lg:w-auto lg:flex-row lg:gap-20 lg:bg-transparent lg:text-base lg:text-white"
        >
          {/* Individual menu links animate one by one */}
          <motion.li
            variants={menuLinksVariants}
            className="menu-link text-3xl hover:text-gray-300 lg:text-base"
            onClick={handleClick}
          >
            <Link href="/">Home</Link>
          </motion.li>
          <motion.li
            variants={menuLinksVariants}
            className="menu-link text-3xl hover:text-gray-300 lg:text-base"
            onClick={handleClick}
          >
            <Link href="/">Find project</Link>
          </motion.li>
          <motion.li
            variants={menuLinksVariants}
            className="menu-link text-3xl hover:text-gray-300 lg:text-base"
            onClick={handleClick}
          >
            <Link href="/">Trending</Link>
          </motion.li>

          <motion.li
            variants={menuLinksVariants}
            className="menu-link absolute bottom-10 flex w-full items-center justify-center border-t-[1px] border-black pt-6 hover:text-gray-300"
            onClick={handleClick}
          >
            {session?.user?.name ? (
              <>
                <Link href="/profile" className="text-md flex items-center gap-4 pr-4 text-right">
                  <img
                    src={session.user.image || '/images/avatar-placeholder.png'}
                    alt="profile picture"
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                  {session.user.name}
                </Link>

                <IoLogOutSharp onClick={handleLogout} />
              </>
            ) : (
              <Link
                className="text-md rounded-lg border-[1px] border-white px-4 py-1"
                href="/login"
              >
                Sign in
              </Link>
            )}
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

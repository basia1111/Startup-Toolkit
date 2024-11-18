'use client';

import { useState, useEffect, useRef } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import useMediaQuery from '@hooks/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const isLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleClick = () => {
    setIsMenuOpen((menu) => !menu);
  };

  useEffect(() => {
    const setProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
  }, []);

  const menuWrapperVariants = {
    initial: {
      height: 0,
      opacity: 0,
      scale: 0.9,
      clipPath: 'inset(50% roundedRect 00px)',
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
        delayChildren: 0.2,
        ease: 'easeInOut',
      },
    },
    animate: {
      height: '100%',
      opacity: 1,
      scale: 1,
      clipPath: 'inset(0% roundedRect 0px)',
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.2,
        type: 'spring',
        stiffness: 50,
        damping: 10,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      scale: 0.9,
      clipPath: 'inset(50% roundedRect 10px)',
      transition: {
        duration: 0.5,
        when: 'afterChildren',
        staggerChildren: 0.2,
        staggerDirection: -1,
        ease: 'easeInOut',
      },
    },
  };

  const menuLinksVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
      backgroundColor: '#fff',
    },
    opened: {
      rotate: 45,
      translateY: 10,
      backgroundColor: '#1a1a1a',
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
      backgroundColor: '#fff',
    },
    opened: {
      rotate: -45,
      translateY: -11,
      backgroundColor: '#1a1a1a',
    },
  };

  return (
    <nav className="nav flex items-center justify-between p-4 lg:p-8">
      <Link href="/" className="logo flex items-center gap-2">
        <p className="logo-txt font-Syne text-2xl font-thin text-white">StartupToolkit</p>
      </Link>
      <div className="menu-wrapper relative">
        <div
          onClick={handleClick}
          className="menu-toggle fixed right-4 top-5 z-50 flex h-6 w-6 cursor-pointer flex-col items-end justify-around gap-2 lg:hidden"
        >
          <motion.div
            variants={top}
            animate={isMenuOpen ? 'opened' : 'closed'}
            className="bar h-[1px] w-7 bg-white"
          />
          <motion.div
            variants={center}
            animate={isMenuOpen ? 'opened' : 'initial'}
            className="bar h-[1px] w-7 bg-white"
          />
          <motion.div
            variants={bottom}
            animate={isMenuOpen ? 'opened' : 'closed'}
            className="bar h-[1px] w-7 bg-white"
          />
        </div>
        <AnimatePresence>
          {(isDesktop || isMenuOpen) && (
            <motion.ul
              variants={menuWrapperVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              id="menu-links-wrapper"
              className="menu-links-wrapper fixed left-0 top-0 z-40 flex h-screen w-full flex-col items-center justify-center gap-8 bg-white p-4 text-xl font-light text-black lg:relative lg:h-auto lg:w-auto lg:flex-row lg:gap-20 lg:bg-transparent lg:text-base lg:text-white"
            >
              <motion.li
                variants={menuLinksVariants}
                className="menu-link text-3xl font-thin hover:text-gray-300 lg:text-base"
              >
                <Link href="/">HOME</Link>
              </motion.li>
              <motion.li
                variants={menuLinksVariants}
                className="menu-link text-3xl font-thin hover:text-gray-300 lg:text-base"
              >
                <Link href="/">IDEAS</Link>
              </motion.li>
              <motion.li
                variants={menuLinksVariants}
                className="menu-link text-3xl font-thin hover:text-gray-300 lg:text-base"
              >
                <Link href="/">ABOUT</Link>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {isDesktop && (
        <div className="z-50 flex w-40 justify-end font-OpenSans font-light text-white">
          {isLoggedIn ? (
            <div>Profile</div>
          ) : (
            providers &&
            Object.values(providers).map((provider) => (
              <button key={provider.id} type="button" onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            ))
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;

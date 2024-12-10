'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GoArrowUpRight } from 'react-icons/go';

const DarkHeroSection = () => {
  const textVariants: Variants = {
    initial: { textShadow: '0 0 0 rgba(255, 255, 255, 0)' },
    animate: {
      textShadow: [
        '0 0 12px rgba(255, 255, 255, 0.8)',
        '0 0 20px rgba(255, 255, 255, 0.6)',
        '0 0 15px rgba(254, 254, 238, 0.8)',
        '0 0 22px rgba(255, 255, 255, 0.7)',
        '0 0 15px rgba(255, 255, 255, 0.8)',
        '0 0 20px rgba(254, 254, 238, 0.6)',
      ],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: 'mirror',
      },
    },
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section className="relative flex h-screen w-full items-center justify-center bg-black bg-[url('/images/hero-bg.png')] bg-contain bg-center bg-no-repeat text-center">
      <div className="z-10 text-white">
        <motion.h1
          className="text-4xl font-bold sm:text-5xl lg:text-6xl"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          Unleash Your <br />
          Entrepreneurial Potential
        </motion.h1>
        <motion.p
          className="mt-4 text-lg sm:text-xl lg:text-2xl"
          variants={textVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.5,
          }}
        >
          Transform your ideas into reality with our powerful platform.
        </motion.p>
        <motion.a
          href="/signup"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-base text-white backdrop-blur-md transition-all hover:bg-white/30"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Get Started
          <GoArrowUpRight className="ml-2" />
        </motion.a>
      </div>
      <div className="absolute inset-0 top-14 z-0 h-[80vh] bg-gradient-to-br from-blue-800/70 via-purple-800/70 to-black blur-[100px]" />
    </section>
  );
};

export default DarkHeroSection;

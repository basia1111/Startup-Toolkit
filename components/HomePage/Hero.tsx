'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoArrowUpRight } from 'react-icons/go';

const textVariants = {
  initial: { textShadow: '0px 0px 0px rgba(255, 255, 255, 0)' },
  animate: {
    textShadow: [
      '0px 0px 9px rgba(255, 255, 255, 1)',
      '0px 0px 15px rgba(255, 255, 255, 0.8)',
      '0px 0px 10px rgba(254, 254, 238, 1)',
      '0px 0px 17px rgba(255, 255, 255, 1)',
      '0px 0px 10px rgba(255, 255, 255, 1)',
      '0px 0px 15px rgba(254, 254, 238, 0.7)',
    ],
  },
};

const Hero = () => {
  return (
    <section className="hero flex w-full max-w-[1320px] flex-col items-center bg-opacity-80 bg-contain bg-center bg-no-repeat py-32 lg:py-64">
      <h1 className="hero-heading font-Inter text-center text-2xl font-normal text-white [text-shadow:_3px_1px_50px_rgb(0_0_0_/_80%)] md:text-4xl lg:text-5xl">
        Empowering Entrepreneurs to <br />
        <motion.p
          className="p-1 md:p-4"
          variants={textVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        >
          Transform Ideas into Reality
        </motion.p>
      </h1>
      <a
        href="/login"
        className="font-Inter glow-button mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-base"
      >
        Start now
        <GoArrowUpRight />
      </a>
    </section>
  );
};

export default Hero;

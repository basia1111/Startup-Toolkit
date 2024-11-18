'use client';

import { useState, useEffect, useRef } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Header = () => {
  const isLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen((menu) => !menu);
  };

  useEffect(() => {
    const setProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
  }, []);

  return (
    <nav className="flex justify-between p-8">
      <Link href="/" className="logo flex items-center gap-2">
        <Image
          className="logo-img object-contain"
          src="/images/logo.png"
          alt="Website logo"
          width={1}
          height={1}
        />
        <p className="logo-txt font-Syne text-xl font-bold text-white">StartupToolkit</p>
      </Link>
      <div className="menu-wrapper absolute left-0 top-0 h-screen w-full bg-black p-4 md:relative md:h-auto md:w-auto md:bg-transparent">
        <div onClick={handleClick} className="menuToggle flex w-8 flex-col gap-2 justify-self-end">
          <div className="bar h-[2px] w-8 bg-white"></div>
          <div className="bar h-[2px] w-8 bg-white"></div>
          <div className="bar h-[2px] w-8 bg-white"></div>
        </div>
        <ul className="menu flex flex-col items-center gap-20 font-OpenSans font-light text-white md:flex-row md:justify-normal">
          <li className="manu-link">
            <Link href="/">Home</Link>
          </li>
          <li className="manu-link">
            <Link href="/">Ideas</Link>
          </li>
          <li className="manu-link">
            <Link href="/">About</Link>
          </li>
        </ul>
      </div>
      <div className="flex w-40 justify-end font-OpenSans font-light text-white">
        {isLoggedIn ? (
          <div>Profile</div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button type="button" onClick={() => signIn(provider.id)}>
                  Goggle
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

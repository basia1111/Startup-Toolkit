import React from 'react';
import Link from 'next/link';

const DesktopMenu = () => {
  return (
    <>
      <ul className="menu-links-wrapper relative hidden h-auto w-auto flex-row items-center justify-center gap-10 bg-transparent p-4 text-base font-light text-white lg:flex">
        <li className="menu-link text-3xl font-normal hover:text-gray-300 lg:text-base">
          <Link href="/">Home</Link>
        </li>
        <li className="menu-link text-3xl font-normal hover:text-gray-300 lg:text-base">
          <Link href="/">Find project</Link>
        </li>
        <li className="menu-link text-3xl font-normal hover:text-gray-300 lg:text-base">
          <Link href="/">Trending</Link>
        </li>
      </ul>
    </>
  );
};

export default DesktopMenu;

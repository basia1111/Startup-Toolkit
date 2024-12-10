import React from 'react';
import Link from 'next/link';

const DesktopMenu = () => {
  return (
    <ul className="menu-links-wrapper relative hidden h-auto w-auto flex-row items-center justify-center gap-10 bg-transparent p-4 text-base font-light text-white/90 lg:flex">
      {['Home', 'Find project'].map((item) => (
        <li
          key={item}
          className="menu-link text-3xl font-normal transition-colors hover:text-white/70 lg:text-base"
        >
          <Link href="/">{item}</Link>
        </li>
      ))}
    </ul>
  );
};

export default DesktopMenu;

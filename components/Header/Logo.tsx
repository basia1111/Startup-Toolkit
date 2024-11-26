import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="logo flex items-center gap-2">
      <p className="logo-txt p-2 font-Syne text-xl font-bold text-white lg:p-4">StartupToolkit</p>
    </Link>
  );
};

export default Logo;

import React from 'react';
import Logo from './Logo';
import AccountActions from './AccountActions/AccountActions';
import HamburgerMenu from './HmaburgerMenu/HamburgerMenu';
import DesktopMenu from './DesktopMenu';

const Header = () => {
  return (
    <nav className="nav fixed left-0 right-0 top-0 z-40 flex w-full items-center justify-between p-4 backdrop-blur-sm">
      <Logo />
      <div className="menu-wrapper items-center md:flex md:flex-row">
        <HamburgerMenu />
        <DesktopMenu />
        <AccountActions />
      </div>
    </nav>
  );
};

export default Header;

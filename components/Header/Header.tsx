import React from 'react';
import Logo from './Logo';
import AccountActions from './AccountActions/AccountActions';
import HamburgerMenu from './HmaburgerMenu/HamburgerMenu';
import DesktopMenu from './DesktopMenu';

const Header = () => {
  return (
    <nav className="nav flex w-full items-center justify-between p-4 lg:p-8">
      <Logo />
      <div className="menu-wrapper relative items-center md:flex md:flex-row">
        <HamburgerMenu />
        <DesktopMenu />
        <AccountActions />
      </div>
    </nav>
  );
};

export default Header;

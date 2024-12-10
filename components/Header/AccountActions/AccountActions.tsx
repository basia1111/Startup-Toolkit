import React from 'react';
import Link from 'next/link';
import { auth } from '@auth';
import AccountActionsDropdown from './AccountActionsDropdown';

const AccountActions = async () => {
  const session = await auth();
  return (
    <div className="w-50 z-50 hidden justify-end font-Inter text-white/90 lg:flex">
      {session?.user?.name ? (
        <div className="flex w-full items-center gap-2 text-right">
          <a href="/profile/me" className="cursor-pointer">
            <img
              src={session.user.image || '/images/avatar.png'}
              alt="profile picture"
              width={30}
              height={30}
              className="h-8 w-8 rounded-full border border-white/10 object-cover transition-opacity hover:opacity-80"
            />
          </a>
          <AccountActionsDropdown />
        </div>
      ) : (
        <>
          <Link
            className="ml-4 rounded-md border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/50"
            href="/register"
          >
            Sign up
          </Link>
          <Link
            className="ml-2 rounded-md px-4 py-2 text-white/80 transition-colors hover:text-white"
            href="/login"
          >
            Sign in
          </Link>
        </>
      )}
    </div>
  );
};

export default AccountActions;

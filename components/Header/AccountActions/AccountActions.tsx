import React from 'react';
import Link from 'next/link';
import { auth } from '@auth';
import AccountActionsDropdown from './AccountActionsDropdown';

const AccountActions = async () => {
  const session = await auth();
  return (
    <div className="w-50 font-Inter z-50 hidden justify-end text-white lg:flex">
      {session?.user?.name ? (
        <div className="flex w-full items-center gap-2 text-right">
          <a href="/profile/me" className="cursor-pointer">
            <img
              src={session.user.image || '/images/avatar-placeholder.png'}
              alt="profile picture"
              width={30}
              height={30}
              className="h-8 w-8 rounded-full object-cover"
            />
          </a>
          <AccountActionsDropdown />
        </div>
      ) : (
        <>
          <Link
            className="hover:text-accent rounded-lg border-[1px] border-white px-4 py-1"
            href="/login"
          >
            Sign in
          </Link>
          <Link className="hover:text-accent ml-4 rounded-lg px-4 py-1" href="/register">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default AccountActions;

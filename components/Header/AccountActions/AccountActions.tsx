import React from 'react';
import Link from 'next/link';
import { auth } from '@auth';
import AccountActionsDropdown from './AccountActionsDropdown';

const AccountActions = async () => {
  const session = await auth();
  return (
    <div className="w-50 z-50 hidden justify-end font-OpenSans font-light text-white lg:flex">
      {session?.user?.name ? (
        <div className="flex w-full items-center gap-2 text-right">
          <img
            src={session.user.image || '/images/avatar-placeholder.png'}
            alt="profile picture"
            width={30}
            height={30}
            className="rounded-full object-cover"
          />
          <AccountActionsDropdown />
        </div>
      ) : (
        <>
          <Link className="rounded-lg border-[1px] border-white px-4 py-1" href="/login">
            Sign in
          </Link>
          <Link className="gradient-bg ml-4 rounded-lg px-4 py-1" href="/register">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default AccountActions;

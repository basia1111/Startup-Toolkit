import React from 'react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const GoogleButton = () => {
  return (
    <>
      <button
        onClick={() => signIn('google')}
        className="glow-button flex w-full items-center justify-center gap-3 rounded-md border-[1px] border-white bg-transparent bg-zinc-900 px-2 py-3 text-white"
      >
        <FaGoogle />
        Continue with Google
      </button>
      <p className="w-full p-4 text-center text-sm text-zinc-300">or</p>
    </>
  );
};

export default GoogleButton;

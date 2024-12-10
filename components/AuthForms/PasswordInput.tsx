import React, { useState } from 'react';
import { PiEye, PiEyeSlash } from 'react-icons/pi';

const PasswordInput = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  return (
    <div className="mb-4 flex items-center gap-2 rounded-md border border-white/10 bg-black/50 transition-all focus-within:border-white/20 focus-within:bg-black/70 focus-within:ring-2 focus-within:ring-white/10">
      <input
        type={isVisiblePassword ? 'text' : 'password'}
        name="password"
        id="password"
        placeholder="password"
        className="text-md w-full rounded-md bg-transparent px-5 py-3 text-white placeholder:text-white/50 focus:border-transparent focus:outline-none focus:ring-0"
      />
      {isVisiblePassword ? (
        <PiEye
          className="size-8 cursor-pointer pr-2 text-white/70 hover:text-white"
          onClick={() => setIsVisiblePassword(false)}
        />
      ) : (
        <PiEyeSlash
          className="size-8 cursor-pointer pr-2 text-white/70 hover:text-white"
          onClick={() => setIsVisiblePassword(true)}
        />
      )}
    </div>
  );
};

export default PasswordInput;

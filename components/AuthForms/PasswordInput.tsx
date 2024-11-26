import React, { useState } from 'react';
import { PiEye, PiEyeSlash } from 'react-icons/pi';

const PasswordInput = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const showPassword = () => {
    setIsVisiblePassword(true);
  };
  const hidePassword = () => {
    setIsVisiblePassword(false);
  };

  return (
    <div className="mb-4 flex items-center gap-2 rounded-md bg-zinc-900 focus-within:ring-1 focus-within:ring-white">
      <input
        type={isVisiblePassword ? 'text' : 'password'}
        name="password"
        id="password"
        placeholder="password"
        className="text-md w-full rounded-md bg-transparent bg-zinc-900 px-5 py-3 text-white focus:border-transparent focus:outline-none focus:ring-0"
      />
      {isVisiblePassword ? (
        <PiEye className="size-8 pr-2 text-white" onClick={hidePassword} />
      ) : (
        <PiEyeSlash className="size-8 pr-2 text-white" onClick={showPassword} />
      )}
    </div>
  );
};

export default PasswordInput;

import React from 'react';

type InputProps = {
  type: string;
  name: string;
};
const Input = ({ type, name }: InputProps) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        name={name}
        id={name}
        placeholder={name}
        className="text-md w-full rounded-md bg-transparent bg-zinc-900 px-5 py-3 text-white focus:border-transparent focus:outline-none focus:ring-1 focus:ring-white"
      />
    </div>
  );
};

export default Input;

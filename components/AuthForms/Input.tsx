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
        className="text-md w-full rounded-md border border-white/10 bg-black/50 px-5 py-3 text-white transition-all placeholder:text-white/50 focus:border-white/20 focus:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/10"
      />
    </div>
  );
};

export default Input;

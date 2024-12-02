import React from 'react';

type InputProps = {
  type?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
};

const Input = ({ type = 'text', name, placeholder, defaultValue }: InputProps) => {
  return (
    <div className="p- relative mb-4">
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="focus:ring-orange-20 focus:rig-2 w-full rounded-lg border border-zinc-300 p-3 text-zinc-900 transition-all duration-300 ease-in-out focus:border-orange-500 focus:outline-none"
      />
    </div>
  );
};

export default Input;

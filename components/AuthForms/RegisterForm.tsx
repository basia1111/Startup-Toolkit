'use client';

import React, { useActionState } from 'react';
import { register } from '@actions/register';
import PasswordInput from './PasswordInput';
import Input from './Input';

const RegisterForm = () => {
  const [message, formAction, isPending] = useActionState(register, null);
  return (
    <>
      <div className="mb-6 mt-8">
        {isPending ? <div className="text-sm text-white">Loading...</div> : ''}
        {message && message === 'success' ? (
          <div className="w-full rounded-md border-[1px] border-emerald-600 bg-emerald-100 px-2 py-1 text-sm text-[#f74242]">
            <p className="text-emerald-600">
              Your account has been registered. <br />
              <a href="/login" className="underline">
                login here
              </a>
            </p>
          </div>
        ) : message ? (
          <div className="border-red w-full rounded-md border-[1px] bg-[#f0d8d8] px-2 py-1 text-sm text-[#f74242]">
            {message}
          </div>
        ) : (
          ''
        )}
      </div>

      <form action={formAction}>
        <Input type="text" name="name" />
        <Input type="email" name="email" />
        <PasswordInput />
        <button
          type="submit"
          className="bg-accent w-full rounded-md bg-gray-800 px-2 py-3 text-white"
        >
          Create account
        </button>
      </form>
    </>
  );
};

export default RegisterForm;

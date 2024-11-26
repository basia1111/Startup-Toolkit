'use client';

import React, { useActionState } from 'react';
import { signIn } from 'next-auth/react';
import PasswordInput from './PasswordInput';
import Input from './Input';

const LoginForm = () => {
  const [message, formAction, isPending] = useActionState(
    async (_: string | null, formData: FormData) => {
      try {
        const result = await signIn('credentials', {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          callbackUrl: '/profile',
          redirect: false,
        });

        if (result?.error) {
          return 'Invalid creddentials';
        } else {
          window.location.href = '/profile';
        }

        return null;
      } catch {
        return 'An unexpected error occurred';
      }
    },
    null,
  );

  return (
    <>
      {isPending ? <div className="text-sm text-white">Loading...</div> : ''}
      {message ? (
        <div className="border-red text-red mb-4 w-full rounded-md border-[1px] bg-[#f0d8d8] px-2 py-1 text-sm">
          {message}
        </div>
      ) : (
        ''
      )}
      <form action={formAction}>
        <Input type="email" name="email" />
        <PasswordInput />
        <button
          type="submit"
          className="gradient-bg w-full rounded-md bg-gray-800 px-2 py-3 text-white"
        >
          Sign in
        </button>
      </form>
    </>
  );
};

export default LoginForm;

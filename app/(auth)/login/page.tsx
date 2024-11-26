'use client';

import React from 'react';
import Link from 'next/link';
import LoginForm from '@components/AuthForms/LoginForm';
import GoogleButton from '@components/AuthForms/GoogleButton';

const LoginPage = () => {
  return (
    <div className="font-Inter flex flex-col items-center justify-center">
      <div className="w-96 rounded-lg p-8 shadow-md">
        <h1 className="mb-4 text-center text-3xl text-white">Sign in</h1>
        <GoogleButton />
        <LoginForm />
        <div className="mt-8 text-center text-sm text-white">
          <Link href="/register">
            Don&apos;t have an account? <span className="font-bold underline">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

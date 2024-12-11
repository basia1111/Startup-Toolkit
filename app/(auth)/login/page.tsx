'use client';

import React from 'react';
import Link from 'next/link';
import LoginForm from '@components/authForms/LoginForm';
import GoogleButton from '@components/authForms/GoogleButton';

const LoginPage = () => {
  return (
    <div className="w-96 rounded-lg border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
      <h1 className="mb-4 text-center text-3xl font-bold text-white">Sign in</h1>
      <GoogleButton />
      <LoginForm />
      <div className="mt-8 text-center text-sm text-white">
        <Link href="/register" className="transition-colors hover:text-white/80">
          Don&apos;t have an account? <span className="font-bold underline">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

'use client';

import React from 'react';
import Link from 'next/link';
import RegisterForm from '@components/authForms/RegisterForm';

const page = () => {
  return (
    <div className="w-96 rounded-lg border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
      <h1 className="mb-4 text-center text-3xl font-bold text-white">Sign up</h1>
      <RegisterForm />
      <div className="mt-8 text-center text-sm text-white">
        <Link href="/login" className="transition-colors hover:text-white/80">
          Already have an account? <span className="font-bold underline">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default page;

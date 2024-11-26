'use client';

import React from 'react';
import Link from 'next/link';
import RegisterForm from '@components/AuthForms/RegisterForm';

const page = () => {
  return (
    <div className="font-Inter flex flex-col items-center justify-center">
      <div className="w-96 rounded-lg p-8 shadow-md">
        <h1 className="mb-4 text-center text-3xl text-white">Sign up</h1>
        <RegisterForm />
        <div className="mt-8 text-center text-sm text-white">
          <Link href="/login">
            Already have an account? <span className="font-bold underline">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

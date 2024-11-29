'use server';

import React from 'react';
import connectDB from '@lib/db';
import User from '@models/User';
import bcrypt from 'bcryptjs';

export const registerCredentials = async (name: string, email: string, password: string) => {
  await connectDB();

  if (!name || !email || !password) {
    return 'Fill all the fields.';
  }

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.authProvider == 'google') {
    return (
      <div>
        <p className="text-red font-Inter">
          It looks like you&apos;ve already registered using Google Sign-In. For security reasons,
          you&apos;ll need to use the &quot;Sign in with Google&quot; button to access your account.
        </p>
        <p className="mb-3">
          <a href="/login" className="underline">
            Go to Login Page
          </a>
        </p>
      </div>
    );
  } else if (existingUser) {
    return (
      <p className="text-red font-Inter">
        An account with this email address already exists ({email}).
        <a href="/login" className="underline">
          {' '}
          Please sign in to continue.
        </a>
      </p>
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await new User({ name, email, password: hashedPassword }).save();

  return 'success';
};

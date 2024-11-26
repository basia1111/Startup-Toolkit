'use server';

import connectDB from '@lib/db';
import { User } from '@models/User';

type GoogleData = {
  name: string;
  email: string;
  image: string;
};
export const registerGoogle = async ({ name, email, image }: GoogleData) => {
  try {
    await connectDB();

    if (!name || !email) {
      return null;
    }
    const user = new User({ name, email, image, authProvider: 'google' });
    const savedUser = await user.save();
    console.log('User saved:', savedUser);
    return { ...savedUser.toObject(), id: savedUser._id.toString() };
  } catch (error) {
    console.error('Error during user registration:', error);
    throw new Error('Error during user registration');
  }
};
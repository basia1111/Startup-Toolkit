import connectDB from '@lib/db';
import User from '@models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ message: 'ID is required' });
  }

  await connectDB();

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' });
    }
    const serializedUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      professionalTitle: user.professionalTitle,
      city: user.city,
      about: user.about,
      socialMedia: user.socialMedia ? { ...user.socialMedia } : null,
      coverImage: user.coverImage,
    };
    return NextResponse.json({ user: serializedUser });
  } catch (error) {
    console.error('error fetching user:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}

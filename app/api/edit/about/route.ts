import { auth } from '@auth';
import User from '@models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const session = await auth();
  const formData = await request.formData();

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'unauthorised' }, { status: 401 });
  }

  const about = formData.get('about') as string;

  if (!about) {
    return NextResponse.json({ message: 'Name is required field.' }, { status: 400 });
  }

  try {
    await User.findByIdAndUpdate(
      session.user.id,
      {
        about: about,
      },
      {
        new: true,
        strict: false,
        timestamps: false,
      },
    );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json(
      {
        message: 'Failed to update user',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

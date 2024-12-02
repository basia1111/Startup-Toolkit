import { auth } from '@auth';
import User from '@models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const session = await auth();
  const formData = await request.formData();

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'unauthorised' }, { status: 401 });
  }

  const name = formData.get('name') as string;
  const professionalTitle = formData.get('professionalTitle') as string;
  const city = formData.get('city') as string;
  const twitter = formData.get('twitter') as string;
  const github = formData.get('github') as string;
  const linkedIn = formData.get('linkedIn') as string;

  if (!name) {
    return NextResponse.json({ message: 'Name is required field.' }, { status: 400 });
  }

  try {
    await User.findByIdAndUpdate(
      session.user.id,
      {
        name: name,
        city: city,
        professionalTitle: professionalTitle,
        'socialmedia.twitter': twitter,
        'socialmedia.github': github,
        'socialmedia.linkedIn': linkedIn,
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

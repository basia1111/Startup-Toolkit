import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@utils/claudinary';
import { auth } from '@/auth';
import User from '@/models/User';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('image') as File;

  if (!file) {
    return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
  }
  console.log(file);

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), 'public', `temp-${session.user.id}`);

    await writeFile(path, buffer);

    const uploadResponse = await cloudinary.uploader.upload(path, {
      folder: 'profile_pictures',
      public_id: session.user.id,
    });

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { image: uploadResponse.secure_url },
      { new: true },
    );

    return NextResponse.json(
      { image: uploadResponse.secure_url, user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        message: 'Upload failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

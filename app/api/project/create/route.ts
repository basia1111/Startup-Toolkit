import { auth } from '@auth';
import connectDB from '@lib/db';
import Project from '@models/Project';
import cloudinary from '@utils/claudinary';
import { NextRequest, NextResponse } from 'next/server';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  const session = await auth();
  const formData = await request.formData();

  await connectDB();

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const email = formData.get('email') as string;
  const inputFile = formData.get('cover') as File | null;
  const author = session.user.id;

  if (!title || !description) {
    return NextResponse.json(
      { message: 'Fields "title" and "description" are required.' },
      { status: 400 },
    );
  }

  try {
    if (inputFile && inputFile.size > 0) {
      const bytes = await inputFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join(process.cwd(), 'public', `temp-${session.user.id}`);

      await writeFile(path, buffer);

      const uploadResponse = await cloudinary.uploader.upload(path, {
        folder: 'project_cover_pictures',
        public_id: `${author}_${title.replace(/\s+/g, '_')}`,
      });

      const newProject = new Project({
        title,
        description,
        email,
        author,
        cover: uploadResponse.secure_url,
      });

      await newProject.save();
      await unlink(path);

      return NextResponse.json({ newProject });
    } else {
      const newProject = new Project({
        title,
        description,
        email,
        author,
      });

      await newProject.save();

      return NextResponse.json({ newProject });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

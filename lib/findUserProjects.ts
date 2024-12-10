import Project from '@models/Project';
import connectDB from './db';

export const findUserProjects = async (id: string) => {
  if (!id) {
    throw new Error('User ID is required');
  }

  await connectDB();

  try {
    const userProjects = await Project.find({ author: id }).lean();
    return userProjects;
  } catch (error) {
    console.error('Error finding user projects:', error);
    throw error;
  }
};
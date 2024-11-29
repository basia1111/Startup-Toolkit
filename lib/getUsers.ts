import connectDB from './db';

const getUsers = async () => {
  await connectDB();

  try {
  } catch (error) {
    console.error(error);
  }
};

export default getUsers;

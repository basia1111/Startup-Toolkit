import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: true },
  image: { type: String },
  authProvider: { type: String },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

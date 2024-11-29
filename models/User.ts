import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: true },
  authProvider: { type: String },
  image: { type: String },
  coverImage: { type: String },
  professionalTitle: { type: String },
  Location: { type: String },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

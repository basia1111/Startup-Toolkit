import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, requied: true },
  author: { type: mongoose.Schema.Types.ObjectId, requied: true, ref: 'User' },
  cover: { type: String },
  email: { type: String },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

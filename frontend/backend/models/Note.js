import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  content: { type: String, required: true },
  subject: { type: String, default: 'General' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Note', NoteSchema);
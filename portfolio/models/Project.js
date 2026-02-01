import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  demo: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

// Auto-generate id from MongoDB _id before saving
ProjectSchema.pre('save', async function() {
  if (!this.id) {
    this.id = this._id.toString();
  }
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

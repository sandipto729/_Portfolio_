import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  readTime: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Auto-generate id from MongoDB _id before saving
BlogSchema.pre('save', async function() {
  if (!this.id) {
    this.id = this._id.toString();
  }
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

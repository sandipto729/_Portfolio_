import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
const AI_BACKEND_URL = process.env.AI_BACKEND_URL || 'http://localhost:8000';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Blog Schema (matching your model)
const BlogSchema = new mongoose.Schema({
  id: String,
  title: String,
  excerpt: String,
  date: String,
  readTime: String,
  imageUrl: String,
  tags: [String],
  content: String,
}, {
  timestamps: true,
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function generateEmbeddings() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('📚 Fetching all blogs from database...');
    const blogs = await Blog.find({});
    console.log(`📊 Found ${blogs.length} blogs\n`);

    if (blogs.length === 0) {
      console.log('⚠️  No blogs found in database');
      return;
    }

    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < blogs.length; i++) {
      const blog = blogs[i];
      console.log(`\n[${i + 1}/${blogs.length}] Processing: "${blog.title}"`);
      
      try {
        // Prepare blog data for embedding API
        const blogData = {
          id: blog.id || blog._id.toString(),
          title: blog.title,
          excerpt: blog.excerpt,
          date: blog.date,
          readTime: blog.readTime,
          tags: blog.tags,
          content: blog.content,
          imageUrl: blog.imageUrl,
        };

        // Call the embedding API
        const response = await fetch(`${AI_BACKEND_URL}/blog/embedding`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API returned ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log(`   ✅ Success! Created ${result.chunks_created} chunks`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed: ${error.message}`);
        failureCount++;
      }

      // Add a small delay to avoid overwhelming the API
      if (i < blogs.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📈 Summary:');
    console.log(`   Total blogs: ${blogs.length}`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the script
console.log('🚀 Starting blog embedding generation...\n');
generateEmbeddings()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.docker' });

// Project Schema (same as the model)
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

ProjectSchema.pre('save', async function() {
  if (!this.id) {
    this.id = this._id.toString();
  }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// Projects data from constant.js
const PROJECTS = [
  {
    title: "School Management System",
    category: "Full-Stack / Production",
    description: "A comprehensive school management platform serving 2000+ users with OTP verification (Redis), real-time alumni chat (Socket.IO), and an AI chatbot using LangChain + RAG for query assistance. Features include profiles, results, admissions, notice board, and blog editor with auto result generation.",
    imageUrl: "https://www.srsnrng.in/assets/Logo-Dd-BOIQa.png",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "Socket.IO", "Cloudinary", "LangChain"],
    github: "https://github.com/sandipto729/SRSN",
    demo: "https://srsn.vercel.app"
  },
  {
    title: "AI-Powered Blogging Platform",
    category: "Full-Stack / AI/ML",
    description: "Advanced blogging platform with AI-based post recommendations using GraphSAGE + HNSW (Neo4j). Features real-time comments via Socket.IO, NextAuth authentication (Google, GitHub), Azure Blob Storage for images, and intelligent tagging system with comprehensive search capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop",
    techStack: ["Next.js", "Node.js", "GraphQL", "Neo4j", "MongoDB", "Socket.IO", "Azure Blob Storage"],
    github: "https://github.com/sandipto729/blog-platform",
    demo: "https://blog-platform-demo.vercel.app"
  },
  {
    title: "E-Commerce Platform",
    category: "MERN Stack / Web",
    description: "Full-featured e-commerce solution where owners can manage products and inventory while users browse, purchase, and checkout securely. Built with modern MERN stack architecture for scalability and performance.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    github: "https://github.com/sandipto729/ecommerce",
    demo: null
  },
  {
    title: "Centrality Detection using Deep Learning",
    category: "AI/ML / Graph Neural Networks",
    description: "Advanced social network analysis using GCN-based node centrality ranking. Implements Degree, PageRank, and STC algorithms with temporal graph convolutional networks (TGCN) for dynamic network analysis.",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    techStack: ["Python", "GCN", "TGCN", "Deep Learning", "NetworkX"],
    github: "https://github.com/sandipto729/centrality-detection",
    demo: null
  },
  {
    title: "Hospital Management System",
    category: "MERN Stack / Healthcare",
    description: "Comprehensive healthcare management solution featuring appointment booking, integrated Razorpay/Stripe payment processing, and video consultation via Jitsi. Streamlines patient-doctor interactions and medical record management.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Razorpay", "Stripe", "Jitsi"],
    github: "https://github.com/sandipto729/hospital-management",
    demo: null
  }
];

async function addProjects() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in .env.local file');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!\n');

    // Check existing projects
    const existingCount = await Project.countDocuments();
    console.log(`Found ${existingCount} existing projects in database.\n`);

    // Add each project
    let addedCount = 0;
    let skippedCount = 0;

    for (const projectData of PROJECTS) {
      try {
        // Check if project with same title already exists
        const existing = await Project.findOne({ title: projectData.title });
        
        if (existing) {
          console.log(`⏭️  Skipped: "${projectData.title}" (already exists)`);
          skippedCount++;
        } else {
          const project = await Project.create(projectData);
          console.log(`✅ Added: "${project.title}"`);
          addedCount++;
        }
      } catch (error) {
        console.error(`❌ Error adding "${projectData.title}":`, error.message);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('Migration Summary:');
    console.log('='.repeat(50));
    console.log(`Total projects in constant.js: ${PROJECTS.length}`);
    console.log(`Successfully added: ${addedCount}`);
    console.log(`Skipped (duplicates): ${skippedCount}`);
    console.log(`Final database count: ${await Project.countDocuments()}`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
    process.exit(0);
  }
}

// Run the migration
console.log('🚀 Starting project migration...\n');
addProjects();

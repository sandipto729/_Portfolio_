import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { authOptions } from '../auth/[...nextauth]/route';

// GET: Fetch all blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Add new blog (admin only)
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const blogData = await request.json();
    
    // Create blog in MongoDB
    const blog = await Blog.create(blogData);
    
    // Send to AI backend for embedding
    try {
      const aiBackendUrl = process.env.AI_BACKEND_URL ;
      const aiResponse = await fetch(`${aiBackendUrl}/blog/embedding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt,
          date: blog.date,
          readTime: blog.readTime,
          tags: blog.tags,
          content: blog.content,
        }),
      });
      
      if (!aiResponse.ok) {
        console.error('Failed to create embeddings:', await aiResponse.text());
      }
    } catch (aiError) {
      console.error('AI backend error:', aiError.message);
      // Continue even if AI embedding fails
    }
    
    return NextResponse.json({
      success: true,
      data: blog,
      message: 'Blog created successfully',
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
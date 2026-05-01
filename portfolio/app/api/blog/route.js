import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { authOptions } from '../auth/[...nextauth]/route';

async function syncBlogEmbedding(blog) {
  const aiBackendUrl = process.env.AI_BACKEND_URL;

  if (!aiBackendUrl) {
    throw new Error('AI_BACKEND_URL is not configured');
  }

  const aiResponse = await fetch(`${aiBackendUrl}/blog/embedding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: blog.id || blog._id.toString(),
      title: blog.title,
      excerpt: blog.excerpt,
      date: blog.date,
      readTime: blog.readTime,
      tags: blog.tags,
      content: blog.content,
      imageUrl: blog.imageUrl,
    }),
  });

  if (!aiResponse.ok) {
    throw new Error(await aiResponse.text());
  }
}

async function deleteBlogEmbedding(blogId) {
  const aiBackendUrl = process.env.AI_BACKEND_URL;

  if (!aiBackendUrl) {
    throw new Error('AI_BACKEND_URL is not configured');
  }

  const aiResponse = await fetch(`${aiBackendUrl}/blog/embedding/${blogId}`, {
    method: 'DELETE',
  });

  if (!aiResponse.ok) {
    throw new Error(await aiResponse.text());
  }
}

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
    
    // Sync to AI backend for embedding
    try {
      await syncBlogEmbedding(blog);
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

// PUT: Update blog (admin only)
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const blogData = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID required' },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      blogData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    try {
      await syncBlogEmbedding(updatedBlog);
    } catch (aiError) {
      console.error('AI backend error:', aiError.message);
    }

    return NextResponse.json({
      success: true,
      data: updatedBlog,
      message: 'Blog updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete blog (admin only)
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID required' },
        { status: 400 }
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    try {
      await deleteBlogEmbedding(deletedBlog.id || deletedBlog._id.toString());
    } catch (aiError) {
      console.error('AI backend error:', aiError.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
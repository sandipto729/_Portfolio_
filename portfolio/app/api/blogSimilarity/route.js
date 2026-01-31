import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// POST: Fetch similar blogs with full blog data
export async function POST(request) {
  try {
    const { blog_id } = await request.json();
    
    // Call AI backend to get similar blog IDs
    const aiBackendUrl = process.env.AI_BACKEND_URL;
    const aiResponse = await fetch(`${aiBackendUrl}/blog/fetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blog_id }),
    });
    
    if (!aiResponse.ok) {
      throw new Error('Failed to fetch similar blogs from AI backend');
    }
    
    const similarBlogIds = await aiResponse.json();
    
    // Fetch actual blog data from MongoDB
    await dbConnect();
    
    const blogsWithDetails = await Promise.all(
      similarBlogIds.map(async (item) => {
        const blog = await Blog.findOne({ id: item.id });
        return {
          ...item,
          blog: blog ? {
            _id: blog._id,
            id: blog.id,
            title: blog.title,
            excerpt: blog.excerpt,
            date: blog.date,
            readTime: blog.readTime,
            imageUrl: blog.imageUrl,
            tags: blog.tags,
          } : null,
        };
      })
    );
    
    return NextResponse.json({
      success: true,
      data: blogsWithDetails,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
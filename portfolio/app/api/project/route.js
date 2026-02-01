import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { authOptions } from '../auth/[...nextauth]/route';

// GET: Fetch all projects
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Add new project (admin only)
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
    const projectData = await request.json();
    
    // Create project in MongoDB
    const project = await Project.create(projectData);
    
    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project created successfully',
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a project (admin only)
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
        { success: false, error: 'Project ID required' },
        { status: 400 }
      );
    }

    await Project.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';
import { sendWelcomeEmail } from '@/lib/mailer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await Newsletter.findOne({ email });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email already registered',
        },
        { status: 409 }
      );
    }

    await Newsletter.create({ email });

    try {
      await sendWelcomeEmail(email);
    } catch (mailError) {
      console.error('Welcome email failed:', mailError.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Subscribed successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

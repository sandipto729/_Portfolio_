import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';
import { sendWelcomeEmail } from '@/lib/mailer';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function verifyTurnstileToken(token) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey || !token) {
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        subscribers,
        count: subscribers.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();
    const turnstileToken = body?.turnstileToken;

    // Verify Turnstile token
    const isValidTurnstile = await verifyTurnstileToken(turnstileToken);
    if (!isValidTurnstile) {
      return NextResponse.json(
        { success: false, error: 'Security verification failed. Please try again.' },
        { status: 400 }
      );
    }

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

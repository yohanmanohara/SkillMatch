import { NextResponse } from 'next/server';
import { saveEmail } from '@/lib/mongodb';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    // Parse and validate request body
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: 'Content-Type must be application/json' },
        { status: 415 }
      );
    }

    const body = await req.json();
    if (!body?.email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const { email } = body;

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address format' },
        { status: 400 }
      );
    }

    // Save to database
    const result = await saveEmail(email);

    return NextResponse.json(
      { 
        success: true,
        message: 'Subscribed successfully!',
        data: {
          id: result.insertedId,
          email,
          createdAt: new Date().toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    
    // Handle different error types
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        success: false,
        message: 'Subscription failed',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
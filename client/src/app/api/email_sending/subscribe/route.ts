import { NextResponse } from 'next/server';
import { saveEmail } from '@/lib/mongodb'; 

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    // Save the email to MongoDB
    const result = await saveEmail(email);

    return NextResponse.json({ message: 'Subscribed successfully!', result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Subscription failed', error }, { status: 500 });
  }
}
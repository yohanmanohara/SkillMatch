import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import User from '@/models/User'; // Update with your User model import

import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, verificationCode, password } = await request.json();

    await connectDB();

    // Find user by email and verification code
    const user = await User.findOne({ email, verificationCode });

    // Check if user is not found or verification code is incorrect
    if (!user || user.verificationCode !== verificationCode) {
      return NextResponse.json({ message: 'Invalid or expired verification code' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user's password and clear verification fields
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          password: hashedPassword,
          verificationCode: null,
          verificationCodeExpires: null,
        },
      },
      { new: true }
    );

    // Handle case where user is not found
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error resetting password', error }, { status: 500 });
  }
}

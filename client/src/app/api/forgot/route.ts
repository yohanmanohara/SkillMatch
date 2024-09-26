import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { connectDB } from '@/utils/db';
import User from '@/models/User'; // Update with your User model import

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random 4-digit number
};

export async function POST(request: Request) {
  const { email } = await request.json();
  const verificationCode = generateVerificationCode();
  const resetLink = `${process.env.NEXT_PUBLIC_URL}/reset-password?code=${verificationCode}`;
  const verificationCodeExpires = new Date();
  verificationCodeExpires.setMinutes(verificationCodeExpires.getMinutes() + 12); // Expires in 32 minutes

  try {
    await connectDB();
    const user = await User.findOneAndUpdate(
      { email },
      { verificationCode, verificationCodeExpires },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      html: `
      <html>
        <body style="font-size: 30px;">
          <p>Your verification code for password reset is: <strong>${verificationCode}</strong></p>
          <p>Please Copy the code  reset your password:</p>
          <p>If you did not request this password reset, please ignore this email.</p>
          <p>
          Puka sududa oyage sudu nam mekatta reply karanna epa </p>
          
        </body>
      </html>
    `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Reset email sent' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
  }
}

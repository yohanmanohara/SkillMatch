// pages/api/sendMail.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Handle POST requests
export async function POST(req) {
  const { firstName, lastName, email, companyName, source, needs } = await req.json();

  if (!firstName || !lastName || !email || !companyName || !source || !needs) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASS, // Your Gmail app password or account password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Change to your recipient address
    subject: `New contact form submission from ${firstName} ${lastName}`,
    text: `
      You have received a new message from the contact form:
      
      Name: ${firstName} ${lastName}
      Email: ${email}
      Company: ${companyName}
      How did you hear about us: ${source}
      Needs: ${needs}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}

// Optionally handle other methods
export async function GET(req) {
  return NextResponse.json({ message: 'This endpoint only accepts POST requests.' });
}
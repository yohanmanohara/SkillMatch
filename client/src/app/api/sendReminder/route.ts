import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, eventTitle, eventDate, eventTime } = body;

    if (!email || !eventTitle || !eventDate || !eventTime) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password or SMTP password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reminder: ${eventTitle}`,
      text: `You have an upcoming event: "${eventTitle}" scheduled for ${eventDate} at ${eventTime}.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Reminder sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}

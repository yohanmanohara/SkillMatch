import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, eventTitle, eventDate, eventTime } = req.body;

  if (!email || !eventTitle || !eventDate || !eventTime) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
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

    return res.status(200).json({ message: "Reminder sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}

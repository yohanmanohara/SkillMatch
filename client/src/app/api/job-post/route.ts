import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Job from '@/models/Job';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        await connectDB();

        const hashedPassword = await hash(password, 10);

        const newJob = new Job({
            name,
            email,
            password: hashedPassword,
        });

        await newJob.save();

        return NextResponse.json({ message: "Job posted" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}

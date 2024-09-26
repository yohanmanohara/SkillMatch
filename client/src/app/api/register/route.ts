import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: any) {
    try {
        const { name, email, password } = await req.json();
        await connectDB();
        
        const user = await User.findOne({ email }).select("_id");
        if (user) {
            console.log("User already exists", user);
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}

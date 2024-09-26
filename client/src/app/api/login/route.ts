import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';


export async function POST(req: any) {
    try {
        const { email, password } = await req.json();
        await connectDB();
        
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        
        return NextResponse.json({
            message: "Login successful",
         
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}

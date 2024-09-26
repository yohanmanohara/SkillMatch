import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import User from '@/models/User';

export async function POST(req: any) {
    try {
        
        const { firstname, lastname, role, secoundemail, bio, email } = await req.json();
        console.log("ewfwe",email);
        await connectDB();
       
  
      
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        // Update user information
        await User.updateOne({ email }, { firstname, lastname, role, secoundemail, bio });

        return NextResponse.json({ message: "Profile updated" }, { status: 201 });
        
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}

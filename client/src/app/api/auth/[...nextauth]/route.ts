// route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Adjust the path as needed

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

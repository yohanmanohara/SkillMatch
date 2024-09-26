// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      firstname?: string;
      lastname?: string;
      role?: string;
      bio?: string;
      secoundemail?: string;
      
    } & DefaultSession["user"];
  }

  interface User {
    firstname: string;
    lastname: string;
  }
}

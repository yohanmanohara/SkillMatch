// authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { connectDB } from "@/utils/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any, account: any }): Promise<boolean> {
      if (account?.provider === "google") {
        console.log("Google sign-in detected");
        await connectDB();

        try {
          const existingUser = await User.findOne({ email: user.email });
          console.log("Existing user:", existingUser);
          
          const [firstName, ...lastNameArray] = user.name.split(' ');
          const lastName = lastNameArray.join(' ');

          if (!existingUser) {
            const newUser = new User({
              firstname: firstName,
              lastname: lastName,
              email: user.email,
              image: user.image,
              secoundemail: '',
              role: '',
              bio: '',
              fileupload: '',  
            });

            await newUser.save();
            console.log("New user saved:", newUser);

            return true;
          }

          console.log("User already exists, skipping save.");
          return true;
        } catch (err) {
          console.error("Error saving user:", err);
          return false;
        }
      }

      return true;
    },
    async session({ session, token }: any) {
      await connectDB();
      const user = await User.findOne({ email: token.email });
      if (user) {
        session.user.firstname = user.firstname;
        session.user.lastname = user.lastname;
        session.user.role = user.role;
        session.user.bio = user.bio;
        session.user.secoundemail = user.secoundemail;
      }
      return session;
    },
  },
};

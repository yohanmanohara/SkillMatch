
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Drawer from "@/components/layouts/dashbord/drawer-admin";
import { getServerSession } from "next-auth";
import SessionProvider  from "@/components/layouts/other/sessionprovider";
import { redirect } from 'next/navigation';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recruitwise",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const session = await getServerSession();
  // if(!session || !session.user) 
  //   {
  //     redirect('/');
  //   }

  return (
    <html lang="en">
      <body className={inter.className}>
      
        <Drawer>
        {children}
        </Drawer>
       
        </body>
    </html>
  );
}
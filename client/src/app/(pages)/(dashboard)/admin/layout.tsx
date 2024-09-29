"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Drawer from "@/components/layouts/dashbord/drawer-admin";
import { getServerSession } from "next-auth";
import SessionProvider  from "@/components/layouts/other/sessionprovider";
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    const token = sessionStorage.getItem('token'); 

    if (!token) {
      setError('No token found');
      window.location.href = '/login'; 
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/admin`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.message);
        sessionStorage.setItem('role', JSON.stringify(result.role));
        const role = result.role.role;
        console.log('User Role:', result.role.role);


        if (role === 'customer') {
          setError('Access denied');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('Email');
          window.location.href = '/login'; 
         
        }
        
        setTimeout(() => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('Email');
            window.location.href = '/login';  
        }, 86400000);


      } else {
        setError('Access denied');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('Email');
            window.location.href = '/login'; 
      }
    } catch (error) {
      setError('Access denied');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('Email');
            window.location.href = '/login'; 
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>{error}</p>;
}
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

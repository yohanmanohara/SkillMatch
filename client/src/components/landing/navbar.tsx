"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Logo from "/public/logo.svg"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User } from '@/constants/data';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const NavigationBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);


  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const storedUserId = sessionStorage.getItem('poop');
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (userId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getsingleuser/?id=${userId}`, {
          cache: 'no-store',
        });
        const data = await res.json();
        setUser(data);
        
      }
    };

    fetchUsers();
   
  }, [userId]);

  const router = useRouter()
  return (
    <div className=" bg-opacity-85 backdrop-blur-lg bg-blend-darken h-20 w-full flex justify-center px-4 fixed z-50 text-primary-0 text-stroke-1">
    <div className="w-full max-w-[1206px] h-full flex justify-between items-center ">
      <div className=' cursor-pointer' onClick={() => router.push("/")}>
      <Image src="/favicon.png" width={30} height={30}  alt="logo" />

      </div>
      <div className='hidden lg:block'>
        <ul className="flex justify-center items-center space-x-8">
          <li className=" text-primary-0 hover:text-gray-300 cursor-pointer"><Link href={'/jobsearch'}>+ Post a Job</Link></li>
          <li className=" text-primary-0 hover:text-gray-300 cursor-pointer"><Link href={'/jobsearch'}>Jobs</Link></li>
          <li className=" text-primary-0 hover:text-gray-300 cursor-pointer"><Link href={'/#contact'}>Contact US</Link></li>
          <li className=" text-primary-0 hover:text-gray-300 cursor-pointer"><Link href={'/#faq'}>FAQ</Link></li>

       <li> {user ? (
          <>
          <DropdownMenu>
           <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full" >
            <Avatar >
              <AvatarImage
                  src="/avatadefault.jpg"  
                  alt="User Avatar"
                  
                  width={24}  // Use exact sizes for consistency
                  height={24}
              /> 
            </Avatar>
          
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
         
        <DropdownMenuItem >
           {user?.username}
         </DropdownMenuItem>

         <DropdownMenuItem 
            onClick={() => {
             sessionStorage.removeItem('poop');

             sessionStorage.removeItem('user');
             sessionStorage.removeItem('role');
             localStorage.removeItem('token');
             sessionStorage.removeItem('token');
             sessionStorage.removeItem('Email');
             window.location.reload();
           }
            }>
           Log out
         </DropdownMenuItem>
        </DropdownMenuContent>

        </DropdownMenu>
          </>
        ) : (
          <Button variant="secondary" size="default" onClick={() => router.push("/login")}>Login</Button>
        )}</li>
          
        </ul>
      </div>
    </div>
  </div>
  

  

  
  

  )
}

export default NavigationBar
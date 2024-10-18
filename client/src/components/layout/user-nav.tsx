'use client';
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
import { useEffect, useState } from 'react';

export  function UserNav() {
 

  interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    country: string;
    city: string;
    status: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const userId = sessionStorage.getItem('poop'); 

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

  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const roleData = sessionStorage.getItem('role');
    const role = roleData ? JSON.parse(roleData).role : null;
    
    if (role === 'Employer') {
      setShowButton(true);
    } 
  }, []); 




    return (
      <div className='flex gap-5'>
         {user?.username}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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


               {showButton ? (
                <>
                <DropdownMenuItem 
                 onClick={() => {
                   window.location.href = '/employer/profile';
                 }
                 }
                 >
                   Profile
                 </DropdownMenuItem>
                 <DropdownMenuItem 
                 onClick={() => {
                   window.location.href = '/employer/profile';
                 }
                 }
                 >
                   Resume CV
                 </DropdownMenuItem>
               </>
                
                 
               
               ):(<DropdownMenuItem 
                 onClick={() => {
                   window.location.href = '/employee/profile';
                 }
               }
                 >
                   Profile
                 </DropdownMenuItem>
               
               ) }
          


        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    );
}

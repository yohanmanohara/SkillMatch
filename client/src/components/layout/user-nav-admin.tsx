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

export default function UserNav() {
 

    return (
      <div className='flex gap-5'>
        <p>Hello! Admin  </p>
      <DropdownMenu>
        
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar >
              <AvatarImage
                  src="/avatadefault.jpg"  // Use a valid URL or image path here
                  alt="User Avatar"
              /> 
            </Avatar>
          
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
         
          
          <DropdownMenuItem 
             onClick={() => {
           
              sessionStorage.removeItem('user');
              sessionStorage.removeItem('role');
              localStorage.removeItem('token');
              sessionStorage.removeItem('token');
              window.location.reload();
            }
             }>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    );
}

'use client';
import { AlertModal } from '@/components/modal/alert-modals';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User } from '@/constants/data';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh(); // Refresh the page
    }, 60000); // 1 minutes in milliseconds

    
    return () => clearInterval(interval);
  }, [router]);






  const ondeactivate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/putinactive/`+ data._id, {
        method: 'PUT',   
       
      });

      if (!res.ok) {
        throw new Error('Failed to deactivate user');
      }
      window.location.reload();
    }
    catch (error) {
      console.error('Error deactivating user:', error);
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const onactivate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/putactive/`+ data._id, {
        method: 'PUT',   
       
      });

      if (!res.ok) {
        throw new Error('Failed to activate user');
      }
      window.location.reload();
    }
    catch (error) {
      console.error('Error activating user:', error);
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  
  const onConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/deleteuser/`+ data._id, {
        method: 'DELETE',   
       
        
      });

      if (!res.ok) {
        throw new Error('Failed to delete user');
      }
      
      window.location.reload();

    } catch (error) {
      console.error('Error deleting user:', error);
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };



  const makeemployee = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/putemployee/`+ data._id, {
        method: 'PUT',   
       
      });

      if (!res.ok) {
        throw new Error('Failed to make employee');
      }
      window.location.reload();
    }
    catch (error) {
      console.error('Error making employee:', error);
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }



 const makeemployeer = async () => {

  setLoading(true);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/putemployer/`+ data._id, {
      method: 'PUT',   
     
    });

    if (!res.ok) {
      throw new Error('Failed to make employeer');
    }
    window.location.reload();
  }
  catch (error) {
    console.error('Error making employeer:', error);
  } finally {
    setLoading(false);
    setOpen(false);
  }


 }




  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
   
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>

          <DropdownMenuItem onClick={ondeactivate}>
            <Trash className="mr-2 h-4 w-4" /> In Active User
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onactivate}>
            <Trash className="mr-2 h-4 w-4" /> Activate User
          </DropdownMenuItem>
          <DropdownMenuItem onClick={makeemployee}>
            <Trash className="mr-2 h-4 w-4" /> Make As Employee
          </DropdownMenuItem>
          <DropdownMenuItem onClick={makeemployeer}>
            <Trash className="mr-2 h-4 w-4" /> Make As Employer
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

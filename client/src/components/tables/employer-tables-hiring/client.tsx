'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import Cards  from '@/components/layout/employer/cards-job';
import AlertDialogDemo from '@/components/layout/employer/alert-dialog-but';


export const UserClient = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Total Jobs `}
          description="Manage users "
        />
       
        <AlertDialogDemo/>
      </div>
      <Separator />



          <Cards/> 



    </>
  );
};

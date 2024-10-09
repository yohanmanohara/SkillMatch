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
interface ProductsClientProps {
  data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Total Jobs (${data.length})`}
          description="Manage users "
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/employer/job/addnew`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
        <AlertDialogDemo/>
      </div>
      <Separator />


{/* 
          <Cards/> */}



        <DataTable searchKey="username" columns={columns} data={data} />
    </>
  );
};

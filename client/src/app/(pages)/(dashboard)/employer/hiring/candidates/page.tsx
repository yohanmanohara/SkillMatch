'use client';

import React from 'react';
import { DataTable } from '@/components/ui/data-table'; 
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface Candidate {
  id: string;
  name: string;
  email: string;
  job: string;
}

const candidates: Candidate[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', job: 'Software Engineer' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', job: 'Product Manager' },
  { id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com', job: 'UX Designer' },
];

const columns: ColumnDef<Candidate>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: 'job',
    header: 'Job',
    cell: ({ row }) => <span>{row.original.job}</span>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex space-x-2 h-10'>
        <Button size="sm" variant='secondary' className='bg-blue-800 w-15 hover:bg-transparent'>
          Process
        </Button>
        <Button size="sm" variant='secondary' className='bg-red-800 w-15 hover:bg-transparent'>
          Reject
        </Button>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
];

export default function Candidates() {
  return (
    <div className="p-4">
      <div className="text-xl font-semibold mb-4">Candidates</div>
      <div className='flex space-x-2 mb-4'>
        <Button size="sm" variant='secondary' className='bg-blue-800 w-15 hover:bg-transparent'>
          Process
        </Button>
        <Button size="sm" variant='secondary' className='bg-red-800 w-15 hover:bg-transparent'>
          Reject
        </Button>
      </div>
      <DataTable columns={columns} data={candidates} searchKey="name" />
    </div>
  );
}

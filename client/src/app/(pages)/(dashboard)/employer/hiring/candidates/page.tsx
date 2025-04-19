'use client';

import React from 'react';
import { DataTable } from '@/components/ui/data-table'; 
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Candidate {
  id: string;
  name: string;
  email: string;
  job: string;
  status: 'new' | 'processed' | 'rejected';
  appliedDate: string;
}

const candidates: Candidate[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', job: 'Software Engineer', status: 'new', appliedDate: '2023-05-15' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', job: 'Product Manager', status: 'processed', appliedDate: '2023-05-10' },
  { id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com', job: 'UX Designer', status: 'rejected', appliedDate: '2023-05-05' },
  { id: '4', name: 'Michael Brown', email: 'michael.b@example.com', job: 'Data Scientist', status: 'new', appliedDate: '2023-05-18' },
  { id: '5', name: 'Sarah Wilson', email: 'sarah.w@example.com', job: 'Frontend Developer', status: 'new', appliedDate: '2023-05-17' },
];

const statusVariantMap: Record<Candidate['status'], 'default' | 'destructive' | 'secondary'> = {
  new: 'secondary',
  processed: 'default',
  rejected: 'destructive',
};

const columns: ColumnDef<Candidate>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 hover:bg-muted/50"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.name}
        <p className="text-sm text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'job',
    header: 'Position',
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.job}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={statusVariantMap[row.original.status]}>
        {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'appliedDate',
    header: 'Applied',
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {new Date(row.original.appliedDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const candidate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(candidate.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem className="text-green-600 focus:text-green-600">
              Process application
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              Reject application
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Candidates() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Candidates</h1>
          <p className="text-muted-foreground">
            Manage your candidate applications
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
        
        </div>
      </div>
      
      <DataTable 
        columns={columns} 
        data={candidates} 
        searchKey="name"
      />
    </div>
  );
}
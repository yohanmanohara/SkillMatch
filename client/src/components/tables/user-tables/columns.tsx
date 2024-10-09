// columns.tsx
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false, // No sorting for this column
  },
  {
    accessorKey: 'id',
    header: 'Id',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'username',
    header: 'NAME',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableSorting: true, // Enable sorting for this column
  },
 
  {
    accessorKey: 'status',
    header: 'STATUS',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'contactnumber',
    header: 'Contact number',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'country',
    header: 'Country',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'role',
    header: 'job role',
    enableSorting: true, // Enable sorting for this column
  },
  {
    
    accessorKey: 'city',
    header: 'City',
    enableSorting: true, // Enable sorting for this column
  },
  
  {
    accessorKey: 'vehicles',
    header: 'Created At',
    enableSorting: true, // Enable sorting for this column
  },
  

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    enableSorting: false, // No sorting for this column
  }
];

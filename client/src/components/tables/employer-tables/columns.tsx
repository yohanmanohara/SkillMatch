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
    accessorKey: 'name',
    header: 'Vehicle Name',
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: 'driverName',
    header: 'Driiver Name',
    enableSorting: true, 
  },
 
  {
    accessorKey: 'status',
    header: 'STATUS',
    enableSorting: true, 
  },
  {
    accessorKey: 'iotid',
    header: 'IOT ID',
    enableSorting: true, 
  },
  {
    accessorKey: 'numberPlate',
    header: 'Number Plate',
    enableSorting: true,
  },
  {
    accessorKey: 'contactnumber',
    header: 'Contact Number',
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    enableSorting: false, // No sorting for this column
  }
];

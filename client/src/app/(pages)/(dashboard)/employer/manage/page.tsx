import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const data = [
  { name: 'John Doe', role: 'Software Engineer', company: 'Tech Corp', email: 'test@gmail.com' },
  { name: 'Jane Smith', role: 'Product Manager', company: 'Startup Inc', email: 'test@gmail.com' },
  { name: 'Michael Brown', role: 'UX Designer', company: 'Design Studio', email: 'michael@gmail.com' },
  { name: 'Emily Davis', role: 'Data Scientist', company: 'Data Analytics', email: 'emily@gmail.com' },
  { name: 'Chris Johnson', role: 'DevOps Engineer', company: 'Cloud Solutions', email: 'chris@gmail.com' },
];

function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage</h1>
      <div className='pl-4 flex justify-center'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead >Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell >
                  <div className="flex gap-2">
                    <Button variant='default' className="text-blue-500">Process</Button>
                    <Button variant='default' className="text-red-500">Reject</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Page;

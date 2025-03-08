import React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const data = [
  { name: 'John Doe', role: 'Software Engineer', company: 'Tech Corp', email: 'test@gmail.com' },
  { name: 'Jane Smith', role: 'Product Manager', company: 'Startup Inc', email: 'test@gmail.com' },
  { name: 'Michael Brown', role: 'UX Designer', company: 'Design Studio', email: 'michael@gmail.com' },
  { name: 'Emily Davis', role: 'Data Scientist', company: 'Data Analytics', email: 'emily@gmail.com' },
  { name: 'Chris Johnson', role: 'DevOps Engineer', company: 'Cloud Solutions', email: 'chris@gmail.com' },
];

function Candidates() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Candidates</h1>
      <div className='pl-4 flex justify-center'>
        <Table>
          <TableHeader>
            <TableRow className="h-16"> {/* Adjust the height here */}
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Applied for</TableHead>
              <TableHead>Company</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="h-16"> {/* Adjust the height here */}
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.company}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Candidates

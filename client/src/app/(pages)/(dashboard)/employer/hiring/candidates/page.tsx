'use client';

import React, { useEffect, useState } from 'react';
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
import { toast } from '@/components/ui/use-toast';

interface AppliedJob {
  _id: string;
  appliedDate: string;
  cvUrl: string;
  jobId: string;
  status: 'applied' | 'interviewed' | 'offered' | 'rejected' | 'new' | 'processed';
  userId: string;
  __v: number;
}

interface JobDetail {
  _id: string;
  title: string;
  companyname: string;
  description: string;
  requirements: string[];
  desirable: string[];
  salaryMin: number;
  salaryMax: number;
  location: string;
  employmentTypes: string[];
  pictureurl: string;
}

interface UserData {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  contactnumber: number;
  cvUrl: string[];
}

interface APIResponse {
  appliedJobs: AppliedJob[];
  user: UserData;
  jobDetails: JobDetail[];
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  status: 'applied' | 'interviewed' | 'offered' | 'rejected' | 'new' | 'processed';
  appliedDate: string;
  cvUrl: string;
  contactNumber?: string;
  salaryRange?: string;
  location?: string;
  employmentType?: string;
}

const statusVariantMap: Record<Candidate['status'], 'default' | 'destructive' | 'secondary' | 'outline'> = {
  applied: 'secondary',
  interviewed: 'outline',
  offered: 'default',
  rejected: 'destructive',
  new: 'secondary',
  processed: 'default',
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = sessionStorage.getItem('userId') || sessionStorage.getItem('poop');

  useEffect(() => {
    const fetchCandidates = async () => {
      if (!userId) {
        setError('No user ID found in session storage');
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/getappliedjobs/?userId=${userId}`, 
          {
            method: 'POST',
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        
        const data: APIResponse = await res.json();
        console.log('API Response:', data);

        const transformedCandidates = data.appliedJobs.map((job: AppliedJob) => {
          const jobDetail = data.jobDetails.find(detail => detail._id === job.jobId);
          const user = data.user;

          return {
            id: job._id,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            jobTitle: jobDetail?.title || `Job ${job.jobId.slice(-4)}`,
            company: jobDetail?.companyname || 'Unknown Company',
            status: job.status,
            appliedDate: job.appliedDate,
            cvUrl: job.cvUrl,
            contactNumber: user.contactnumber?.toString(),
            salaryRange: jobDetail ? `Rs. ${jobDetail.salaryMin.toLocaleString()} - ${jobDetail.salaryMax.toLocaleString()}` : undefined,
            location: jobDetail?.location,
            employmentType: jobDetail?.employmentTypes?.join(', ')
          };
        });

        setCandidates(transformedCandidates);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [userId]);

  const handleViewCV = (cvUrl: string) => {
    try {
      if (!cvUrl) {
        throw new Error('No CV URL available');
      }
      
      if (!isValidUrl(cvUrl)) {
        throw new Error('Invalid CV URL');
      }

      const encodedUrl = encodeURI(cvUrl);
      window.open(encodedUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening CV:', error);
      toast({
        title: 'Error',
        description: 'Could not open CV. Please try again later.',
        variant: 'destructive',
      });
    }
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 hover:bg-muted/50"
        >
          Applicant
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.name}
          <p className="text-sm text-muted-foreground">
            {row.original.email}
            {row.original.contactNumber && (
              <span className="block">{row.original.contactNumber}</span>
            )}
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'jobTitle',
      header: 'Position',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.jobTitle}</div>
          <div className="text-sm text-muted-foreground">{row.original.company}</div>
          {row.original.salaryRange && (
            <div className="text-sm text-muted-foreground">{row.original.salaryRange}</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={statusVariantMap[row.original.status]}>
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </Badge>
      ),
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: 'appliedDate',
      header: 'Applied',
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {new Date(row.original.appliedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
          {row.original.location && (
            <div className="text-sm">{row.original.location}</div>
          )}
          {row.original.employmentType && (
            <div className="text-sm">{row.original.employmentType}</div>
          )}
        </div>
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
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(candidate.email)}>
                Copy email
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleViewCV(candidate.cvUrl)}
                disabled={!candidate.cvUrl}
              >
                View CV
              </DropdownMenuItem>
              {candidate.contactNumber && (
                <DropdownMenuItem onClick={() => candidate.contactNumber && navigator.clipboard.writeText(candidate.contactNumber)}>
                  Copy phone number
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                className="text-green-600 focus:text-green-600"
                onSelect={(e) => e.preventDefault()}
              >
                Process application
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600"
                onSelect={(e) => e.preventDefault()}
              >
                Reject application
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (loading) {
    return <div className="p-6">Loading applications...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Applications</h1>
          <p className="text-muted-foreground">
            Manage your job applications and status
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
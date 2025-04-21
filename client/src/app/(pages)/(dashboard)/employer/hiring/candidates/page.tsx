'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table'; 
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SortedCandidates  from '@/components/layout/employer/sortedcandidates';
import { ArrowUpDown, MoreHorizontal, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { Sort } from '@mui/icons-material';

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
  username: string;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  contactnumber: number;
  cvUrl: string[];
}

interface APIResponse {
  applieduser: any;
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
  status: 'applied' | 'interviewed' | 'offered' | 'rejected' | 'new' | 'processed'|'sorted' | 'unsorted';
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
  sorted: 'default',
  unsorted: 'outline',
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
  const [positionFilters, setPositionFilters] = useState<string[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const userId = sessionStorage.getItem('userId') || sessionStorage.getItem('poop');
  const [sortedButton, setSortedButton] = useState(false);

  const handleExportCSV = () => {
    const csvRows = [
      ['Name', 'Email', 'Position', 'Company', 'Status', 'Applied Date', 'CV URL'].join(','),
      ...filteredCandidates.map((candidate) =>
        [
          candidate.name,
          candidate.email,
          candidate.jobTitle,
          candidate.company,
          candidate.status,
          candidate.appliedDate,
          candidate.cvUrl,
        ].join(',')
      ),
    ];

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'candidates.csv';
    link.click();
  };

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
          const user = data.applieduser.find((user: { _id: string; }) => user._id === job.userId);
          


          return {
            id: job._id,
            name: user.username,
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
        
        // Extract unique job titles for filters
        const uniquePositions = Array.from(
          new Set(transformedCandidates.map(candidate => candidate.jobTitle))
        );
        setPositionFilters(uniquePositions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [userId]);

 

  const filteredCandidates = (selectedPosition
    ? candidates.filter(candidate => candidate.jobTitle === selectedPosition)
    : candidates
  ).filter(candidate => sortedButton 
    ? ['applied', 'interviewed', 'processed', 'offered', 'rejected', 'sorted'].includes(candidate.status)
    : true
  );
  const handlePositionFilter = (position: string | null) => {
    setSelectedPosition(position);
  };

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

        
        const handleSortCandidate = async (candidateId: string) => {
          try {
          
            setCandidates(prev => prev.map(c => 
              c.id === candidateId ? { ...c, status: 'sorted' } : c
            ));
        
            console.log('Sorting candidate:', candidateId);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/candidates/sort`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                candidateId,
              }),
            });
        
            if (!response.ok) {
              throw new Error('Failed to sort candidate');
            }
        
            toast({
              title: 'Candidate sorted',
              description: 'The candidate has been marked as sorted',
            });
          } catch (error) {
            // Revert on error
            setCandidates(prev => prev.map(c => 
              c.id === candidateId ? { ...c, status: 'applied' } : c
            ));
            toast({
              title: 'Error',
              description: 'Failed to sort candidate',
              variant: 'destructive',
            });
          }
        };      

        const handleRejectCandidate = async (candidateId: string) => {
          try {
            // const rejectionReason = prompt('Please enter rejection reason:') || 'No reason provided';
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/candidates/reject`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({ 
                candidateId,
                // rejectionReason 
              })
            });
        
            const data = await response.json();
        
            if (!response.ok) {
              throw new Error(data.message || 'Failed to reject candidate');
            }
        
            // Update local state
            setCandidates(prev => prev.map(c => 
              c.id === candidateId ? { 
                ...c, 
                status: 'rejected',
                // rejectionReason 
              } : c
            ));
        
            toast({
              title: 'Success',
              description: 'Application rejected successfully!',
              variant: 'default',
            });
        
          } catch (error) {
            console.error('Rejection failed:', error);
            toast({
              title: 'Error',
              description: error instanceof Error ? error.message : 'Failed to reject application',
              variant: 'destructive',
            });
          }
        };
        

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
              <DropdownMenuItem 
               className="text-green-600 focus:text-green-600"
                    >
             Show Job Details
            </DropdownMenuItem>

            
              {candidate.contactNumber && (
                <DropdownMenuItem onClick={() => candidate.contactNumber && navigator.clipboard.writeText(candidate.contactNumber)}>
                  Copy phone number
                </DropdownMenuItem>
              )}

           {(candidate.status === 'applied' || candidate.status ==='unsorted') && (
            <div>
                  <DropdownMenuItem 
                   className="text-green-600 focus:text-green-600"
                   onSelect={(e) => {
                    e.preventDefault();
                   handleSortCandidate(candidate.id);
                 }}
                   >
                 Sort the candidates
                </DropdownMenuItem>
                <DropdownMenuItem 
                 className="text-red-600 focus:text-red-600"
                       onSelect={(e) => {
                       e.preventDefault();
                     handleRejectCandidate(candidate.id);
                       }}
                        >
                Reject application
                 </DropdownMenuItem>

                </div>    
              )}

           

    
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

  function toggleFavorite(candidateId: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>

    {
      sortedButton ?(
   
    <SortedCandidates
    candidates={candidates}
    filteredCandidates={filteredCandidates.filter(c => 
      ['interviewed', 'processed', 'offered', 'rejected', 'sorted'].includes(c.status)
    )}
    positionFilters={positionFilters}
    selectedPosition={selectedPosition}
    handlePositionFilter={handlePositionFilter}
    handleExportCSV={handleExportCSV}
    setSortedButton={setSortedButton}
    toggleFavorite={toggleFavorite}
    handleViewCV={handleViewCV}
  />
      ):(

        <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Candidates</h1>
          <p className="text-muted-foreground">
            Manage your job applications and status
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Position Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {selectedPosition ? `Position: ${selectedPosition}` : 'Filter by Position'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter Positions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handlePositionFilter(null)}
                className={!selectedPosition ? 'bg-accent' : ''}
              >
                All Positions
              </DropdownMenuItem>
              {positionFilters.map(position => (
                <DropdownMenuItem
                  key={position}
                  onClick={() => handlePositionFilter(position)}
                  className={selectedPosition === position ? 'bg-accent' : ''}
                >
                  {position}
                </DropdownMenuItem>
              ))}     
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSortedButton(true)}>
            Sorted Candidates
          </Button>
        </div>
      </div>
      
      <DataTable 
        columns={columns} 
        data={filteredCandidates} 
        searchKey="name"
      />
    </div>

      )
    }

    
    </>

  );
}

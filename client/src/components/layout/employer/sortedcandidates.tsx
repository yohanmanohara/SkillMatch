'use client';

import React, { useEffect, useState } from 'react';
import  CalSetupForm from '@/components/layout/employer/Cal.com';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface AppliedJob {
  _id: string;
  appliedDate: string;
  cvUrl: string;
  jobId: string;
  status: 'applied' | 'interviewed' | 'offered' | 'rejected' | 'new' | 'processed' | 'sorted'|'hired';
  userId: string;
  __v: number;
  isFavorite?: boolean;
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

interface Candidate {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  status: 'applied' | 'interviewed' | 'offered' | 'rejected' | 'new' | 'processed' | 'sorted' | 'unsorted' | 'hired';
  appliedDate: string;
  cvUrl: string;
  contactNumber?: string;
  salaryRange?: string;
  location?: string;
  employmentType?: string;
  isFavorite?: boolean;
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
  hired: 'destructive',
};

interface SortedCandidatesProps {
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  positionFilters: string[];
  selectedPosition: string | null;
  handlePositionFilter: (position: string | null) => void;
  handleExportCSV: () => void;
  setSortedButton: (value: boolean) => void;
  toggleFavorite: (candidateId: string) => void;
  handleViewCV: (cvUrl: string) => void;
}

interface User {
  id: string;
  calUsername: string;
  calApiKey?: string;
  calEventType?: string;
}

const SortedCandidates: React.FC<SortedCandidatesProps> = ({
  filteredCandidates,
  positionFilters,
  selectedPosition,
  handlePositionFilter,
  handleExportCSV,
  setSortedButton,
  toggleFavorite,
  handleViewCV
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [processingCandidate, setProcessingCandidate] = useState<Candidate | null>(null);
  const [isCalEmbedOpen, setIsCalEmbedOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showCalSetup, setShowCalSetup] = useState(false);
  const userId = sessionStorage.getItem('poop');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/caluser`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId })
            
          }
        );
        
        const data = await response.json();
      
       
        if (response.ok) {
          setCurrentUser(data.user);
        } else {
          throw new Error(data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchCurrentUser();
  }, []);

  const getCalEmbedUrl = (candidate: Candidate) => {
    if (!currentUser?.calUsername) {
     
      return '';
    }

    const baseUrl = "https://cal.com";
    const eventType = currentUser.calEventType || "45min";
    
    const params = new URLSearchParams({
      name: candidate.name,
      email: candidate.email,
      guest: candidate.email,
      notes: `Interview for ${candidate.jobTitle} position at ${candidate.company}\n\nCandidate Details:\n- Phone: ${candidate.contactNumber || 'N/A'}\n- Applied: ${new Date(candidate.appliedDate).toLocaleDateString()}\n- CV: ${candidate.cvUrl || 'Not provided'}`,
    });
    
    return `${baseUrl}/${currentUser.calUsername}/${eventType}?${params.toString()}`;
  };

  const haddlehireclick = async (candidate: Candidate) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/candidates/hire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ candidateId: candidate.id })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to hire candidate');
      }
  
      toast({
        title: 'Success',
        description: 'Candidate hired successfully!',
        variant: 'default',
      });
  
      window.location.reload();
  
    } catch (error) {
      console.error('Hiring failed:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to hire candidate',
        variant: 'destructive',
      });
    }
  }
  const handleProcessClick = (candidate: Candidate) => {
    if (!currentUser?.calUsername) {
      setProcessingCandidate(candidate);
      setShowCalSetup(true);
      return;
    }
    setProcessingCandidate(candidate);
    setIsCalEmbedOpen(true);
  };

  const handleCalBookingSuccess = () => {
    if (!processingCandidate) return;

    const updateCandidateStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/candidates/process`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ 
            candidateId: processingCandidate.id,
            status: 'processed'
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to update candidate status');
        }


        toast({
          title: 'Success',
          description: 'Interview scheduled successfully!',
          variant: 'default',
        });
        window.location.reload();

        setTimeout(() => {
          setIsCalEmbedOpen(false);
          setProcessingCandidate(null);
        }, 1500);

      } catch (error) {
        console.error('Status update failed:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to update candidate status',
          variant: 'destructive',
        });
      }
    };

    updateCandidateStatus();
  };


  const handleRejectCandidate = async (candidateId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/candidates/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ candidateId })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to reject candidate');
      }
  
      setCandidates(prev => prev.map(c => 
        c.id === candidateId ? { ...c, status: 'rejected' } : c
      ));
  
      toast({
        title: 'Success',
        description: 'Application rejected successfully!',
        variant: 'default',
      });
  
      window.location.reload();
  
    } catch (error) {
      console.error('Rejection failed:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to reject application',
        variant: 'destructive',
      });
    }
  };

  const handleUnsortCandidate = async (candidateId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/candidates/unsort`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ candidateId })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to unsort candidate');
      }
  
      setCandidates(prev => prev.map(c => 
        c.id === candidateId ? { ...c, status: 'applied' } : c
      ));
  
      toast({
        title: 'Success',
        description: 'Candidate unsorted successfully!',
        variant: 'default',
      });
      window.location.reload();
  
    } catch (error) {
      console.error('Unsorting failed:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to unsort candidate',
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
              <DropdownMenuItem className="text-green-600 focus:text-green-600">
                Show Job Details
              </DropdownMenuItem>


           { (candidate.status === 'processed' || candidate.status === 'interviewed')
            && (
              <DropdownMenuItem className="text-green-600 focus:text-green-600"
              onSelect={(e) => {
                e.preventDefault();
                haddlehireclick(candidate);
              }}
              >
                hired
              </DropdownMenuItem>
            )
             }
              {candidate.contactNumber && (
                <DropdownMenuItem onClick={() => candidate.contactNumber && navigator.clipboard.writeText(candidate.contactNumber)}>
                  Copy phone number
                </DropdownMenuItem>
              )}

              {!(candidate.status === 'processed' || candidate.status === 'interviewed') && (
                <DropdownMenuItem 
                  className="text-green-600 focus:text-green-600"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleProcessClick(candidate);
                  }}
                >
                  Schedule Interview
                </DropdownMenuItem>
              )}

              {candidate.status === 'rejected' ? null : (
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleRejectCandidate(candidate.id);
                  }}
                >
                  Reject application
                </DropdownMenuItem>
              )}

              {candidate.status === 'sorted' && (
                <DropdownMenuItem 
                  className="text-orange-500"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleUnsortCandidate(candidate.id);
                  }}
                >
                  Unsort the candidates
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];


  
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sorted Job Applications</h1>
          <p className="text-muted-foreground">
            Showing only sorted candidates
          </p>
        </div>
        <div className="flex items-center space-x-2">
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
          <Button variant="outline" size="sm" onClick={() => setSortedButton(false)}>
            Show All Candidates
          </Button>
        </div>
      </div>
      
      <DataTable 
        columns={columns} 
        data={filteredCandidates} 
        searchKey="name"
      />
      
      <Dialog open={showCalSetup} onOpenChange={setShowCalSetup}>

      
      <DialogContent>
      <DialogTitle>Set up Cal.com Username</DialogTitle>
              
      <CalSetupForm
        userId={userId || ''}
        setCurrentUser={setCurrentUser}
        setShowCalSetup={setShowCalSetup}
        setIsCalEmbedOpen={setIsCalEmbedOpen}
      />
      </DialogContent>
    </Dialog> 

      <Dialog open={isCalEmbedOpen} onOpenChange={setIsCalEmbedOpen}>
        <DialogContent className="sm:max-w-[80vw] h-fit">
          <DialogHeader>
            <DialogTitle>Schedule Interview with {processingCandidate?.name}</DialogTitle>
            <DialogDescription>
              Select an available time slot for the interview
            </DialogDescription>
          </DialogHeader> 
          
          {processingCandidate && (
            <div className="h-[700px] w-full">
              <iframe
                src={getCalEmbedUrl(processingCandidate)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                onLoad={() => {
                  window.addEventListener('message', (e) => {
                    if (e.origin === "https://cal.com" && e.data.type === "bookingSuccessful") {
                      handleCalBookingSuccess();
                    }
                  });
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SortedCandidates;  
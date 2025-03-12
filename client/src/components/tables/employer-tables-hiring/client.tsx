'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import Cards from '@/components/layout/employer/cards-job';
import AlertDialogDemo from '@/components/layout/employer/alert-dialog-but';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const UserClient = () => {
  const router = useRouter();

  // State for jobs, loading, and error handling
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; // Limit of jobs per page

  const handleDelete = (jobId: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/fetchjobs`);
        const data = await res.json();
        
        setJobs(data.reverse()); // Reverse to show most recent first
      } catch (err) {
        setError("Failed to fetch job data");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Handlers for pagination navigation
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;
  if (!jobs.length) return <p>No job data available.</p>;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="Total Jobs" description="Manage users" />
        <AlertDialogDemo />
      </div>
      <Separator />

      {/* Centering the cards */}
      <div className='flex flex-col items-center justify-center md:flex-row gap-4'>
        <div className='w-full md:w-1/6'></div>
        <div className='w-full md:w-4/6 flex flex-col gap-4'>
        {currentJobs.map((job) => (
          <Cards key={job.id} job={job} onDelete={handleDelete} />
        ))}
        </div>
        <div className='w-full md:w-1/6'></div>
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={currentPage === 1 ? undefined : handlePrevious} />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(index + 1)} 
                    isActive={index + 1 === currentPage}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext onClick={currentPage === totalPages ? undefined : handleNext} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

'use client';
import { useEffect, useState } from 'react';
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
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = sessionStorage.getItem('poop');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/getorganizationjobs/?id=${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
  
        const data = await res.json();
        const parsedData = Array.isArray(data.jobItems) ? data.jobItems.reverse() : [];
        setJobs(parsedData);
      } catch (err) {
        setError("Failed to fetch job data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchJob(); // Call the function here
  }, []);
  

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Total Jobs (${jobs.length})`} description="Manage users" />
        <AlertDialogDemo />
      </div>
      <Separator />

      {!error ? (
        <div className='flex flex-col items-center justify-center md:flex-row gap-4'>
          <div className='w-full md:w-1/6'></div>
          <div className='w-full md:w-4/6 flex flex-col gap-4'>
            {currentJobs.map((job) => (
              <Cards key={job._id} job={job} onDelete={()=>{}} onEdit={() => { /* handle edit */ }} />
            ))}
          </div>
          <div className='w-full md:w-1/6'></div>
        </div>
      ) : (
        <p className="tjobsext-center text-red-500">{error}</p>
      )}

      {!error && totalPages > 1 && (
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
                    className={index + 1 === currentPage ? "bg-blue-500 text-white" : ""}
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

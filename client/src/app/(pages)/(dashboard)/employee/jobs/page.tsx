// Path: pages/jobs.tsx

'use client';

import React, { useState, useEffect } from 'react';
import JobCardSecondary, { JobCardSecondaryProps } from '@/components/layouts/cards/jobCardSecondary';
import JobDescription, { JobDescriptionProps } from '@/components/layouts/cards/jobDescription';
import SearchComponent from '@/components/layouts/cards/SearchComponent';
import axios from 'axios';

interface ExtendedJobCardSecondaryProps extends JobCardSecondaryProps {
  id: string;
}

const Page: React.FC = () => {
  const [jobData, setJobData] = useState<ExtendedJobCardSecondaryProps[] | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobDescriptionProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useState({
    jobTitle: '',
    location: '',
    jobType: '',
    modality: '',
    country: '',
    salary: ''
  });

  const handleSearch = async (params: typeof searchParams) => {
    try {
      const response = await axios.get('/api/jobsearch', { params });
      const jobIds = response.data.map((job: { id: string }) => job.id);

      const jobDetailsPromises = jobIds.map((id: string) =>
        axios.get(`/api/jobSearch/${id}`)
      );

      const jobDetailsResponses = await Promise.all(jobDetailsPromises);
      const jobDetails = jobDetailsResponses.map(response => response.data);

      setJobData(jobDetails);
    } catch (error) {
      console.error('Error making search API call:', error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job data:', error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const fetchJobDetails = async (jobId: string) => {
    try {
      const response = await axios.get(`/api/jobSearch/${jobId}`);
      setSelectedJob(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobData) {
    return <div>No job data available</div>;
  }

  return (
    <div className='flex justify-center gap-4'>
      <SearchComponent 
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleSearch={handleSearch}
      />
      <div className='flex flex-col justify-center gap-4'>
        {jobData.map((job) => (
          <div key={job.id} onClick={() => fetchJobDetails(job.id)}>
            <JobCardSecondary
              logoSrc={job.logoSrc}
              iconSrc={job.iconSrc}
              companyName={job.companyName}
              jobTitle={job.jobTitle}
              location={job.location}
              tags={job.tags}
              date={job.date}
            />
          </div>
        ))}
        {selectedJob && (
          <div className='grids grid-cols-1'>
            <JobDescription {...selectedJob} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

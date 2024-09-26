// /path/to/jobCardSecondary.tsx
'use client'
import React from 'react'
import Image from 'next/image'
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Define the props interface
export interface JobCardSecondaryProps {
  logoSrc: string;
  iconSrc: string;
  companyName: string;
  jobTitle: string;
  location: string;
  tags: string[];
  date: string;
}


const JobCardSecondary: React.FC<JobCardSecondaryProps> = ({logoSrc, iconSrc,  companyName,  jobTitle,  location,  tags,  date,}) => {
  return (
    <div className='flex items-center justify-between border-0 rounded-md shadow-2xl gap-4 w-[500px] p-4 m-4'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Image src={logoSrc} alt='logo' width={50} height={50} className='border-0 rounded-md' />
        <div>text</div>
      </div>
      <div className='flex flex-col items-start justify-start gap-3'>
        <div className='text-xs'>{companyName}</div>
        <div className=' text-lg font-semibold'>{jobTitle}</div>
        <div className='flex items-center justify-center gap-2 text-xs'>
          <LocationOnIcon />
          <div>{location}</div>
        </div>
        <div className='flex items-center justify-center gap-4 text-sm'>
          {tags.map((tag, index) => (
            <div key={index} className='border-2 border-accent-200 rounded-md px-1'>
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-between flex-col h-full'>
        <Image src={iconSrc} alt='icon' width={20} height={20} />
        <div className=' text-fonts-primary text-xs'>{date}</div>
      </div>
    </div>
  );
}

export default JobCardSecondary;

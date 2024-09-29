import Image, { StaticImageData } from 'next/image'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@/components/Buttons/Buttons';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export interface JobDescriptionProps {
    jobTitle: string;
    logo: StaticImageData;
    banner: StaticImageData;
    varified: StaticImageData;
    favourite: StaticImageData;
    location: string;
    datePosted: string;
    applications: number;
    description: string;
    requirements?: string[];
  }
  
  
  
  
  const jobDescription: React.FC<JobDescriptionProps> = ({jobTitle, logo, banner, varified, favourite, location, datePosted, applications, description, requirements}) => {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg px-2 border-0 shadow-xl gap-12 w-[600px] overflow-auto max-h-[600px] pt-36 relative'>
      <Image src={banner} alt='banner' className='mt-52 border-0 rounded-md' />
      <Image src={logo} alt='logo' className='border-0 rounded-full absolute top-[125px] left-16' width={60} />
      <div className='flex flex-col items-start justify-center gap-8 px-4'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-col items-start justify-between gap-2'>
            <div className='font-semibold text-2xl'>{jobTitle}</div>
            <div className='flex items-center justify-center gap-2'>
              <LocationOnIcon fontSize='small' />
              <div>{location}</div>
            </div>
          </div>
          <div className='flex flex-col items-end justify-center gap-2'>
            <div className='flex items-center justify-center gap-4'>
              {varified && <VerifiedIcon fontSize='small' color='success' />}
              <ShareIcon fontSize='small' color='action' />
              {favourite && <FavoriteIcon fontSize='small' color='action' />}
            </div>
            <div className='flex gap-2 items-center justify-center'>
              <div>{datePosted}</div>
              <div>{applications} applied</div>
            </div>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant={'primary'} size={'medium'}>Apply Now</Button>
          <Button variant={'primary'} size={'medium'} className='flex gap-2'>
            Apply via
            <LinkedInIcon />
          </Button>
        </div>
        <div>
          <div className='text-lg font-semibold'>Description</div>
          <div className='text-1'>{description}</div>
        </div>
        <div className='flex items-start justify-center flex-col '>
          <div className='font-semibold'>Requirements</div>
          <ul>
            {requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default jobDescription

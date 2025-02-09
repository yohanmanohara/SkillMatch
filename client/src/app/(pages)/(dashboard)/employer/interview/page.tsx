import Container from '@/components/common/container'
import React from 'react'
import {Button} from '@/components/ui/button';
import Image from 'next/image';

function page() {
  const jobData = [
    {
      title: 'Cloud Solutions Architect',
      company: 'Facebook',
      name: 'John Doe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    },
    {
      title: 'Software Engineer',
      company: 'Google',
      name: 'Jane Doe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    },
    {
      title: 'Product Manager',
      company: 'Microsoft',
      name: 'John Doe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    },
    {
      title: 'Data Scientist',
      company: 'Amazon',
      name: 'Jane Doe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    }
  ];

  return (
    <>
      
       <Container>

        
        <div className='flex flex-col justify-evenly gap-10'>
            <div className='font-semibold text-[40px] leading-[normal]'>Interviews</div>

                {jobData.map((job, index) => (
                  <div key={index} className='flex items-center gap-4 p-4 border-b'>
                    <div className='flex justify-between w-full'>
                        <div className='flex items-center gap-4'>
                        <Image src={job.logo} alt={`${job.company} logo`} width={48} height={48} className='w-12 h-12' />
                        <div>
                          <div className='font-bold'>{job.title}</div>
                          <div>{job.company}</div>
                          <div>{job.name}</div>
                        </div>
                        </div>
                      
                    <div>
                    <Button variant={'default'} className='bg-[#3BDE6C]'>Start Meeting</Button>
                    </div>
                   
                    
                  </div>
                  </div>
                ))}

            
        </div>
         
       </Container>
    </>
  )
}

export default page

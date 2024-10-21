import React from 'react'
import { Button } from '@/components/ui/button';


const JobDescription = () => {
    const jobData = [
        {
          title: 'Cloud Solutions Architect',
          company: 'Company Name',
          jobType: 'Full Time',
          tags: ['On Site', 'Full Time'],
          logo: './JobIcon.png',
          salary: '$100,000 - $120,000',
          location: 'Dhaka, Bangladesh',
          posted: '14 Jun, 2021',
            experience: '3 years',
            education: 'Graduation',
            expire: '14 Aug, 2021',
            level: 'Entry level',
             requirements: '3+ years of experience in a similar role, Experience with cloud-based technologies, Experience with AWS, Azure, and GCP',
             benifits: 'Health insurance, Paid time off, Professional development assistance',
             desirable: 'Experience with Kubernetes, Experience with Terraform, Experience with Docker',
             description: ["Velstar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!",
                          "Here at Velstar, we don't just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.",
                            "The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure, and scalable features for our clients on the Shopify platform.",
                            "Want to work with us? You're in good company!"]
             


        },
       
    ];
  return (
    <>
    {jobData.map((job, index) => (

    <div key={index} style={{ width: '100%', height: 'auto' }}  
     className=' flex flex-col justify-center   h-auto gap-5 items-center mt-20 pt-10 '>
        <div className=' top flex flex-col gap-3 items-center w-full  sm:flex-row sm:justify-between'>
            <div className='top-left flex justify-start gap-2 w-full '>
                <img src={job.logo} alt='company logo'  className='w-24 h-24 rounded-[100px] '/>
                
                <div className='pt-3 flex flex-col justify-center pl-3 gap-2'>
                    <h1 className='font-sans text-2xl font-medium leading-[32px] '>{job.title}</h1>
                    <div className='flex justify-between gap-2 font-sans text-base font-normal leading-[28px]'>
                        <p>{job.company}</p>
                        <div className='flex items-center gap-2 px-1 py-0 rounded-full bg-green-500 text-white font-inter text-xs w-auto sm:text-sm sm:px-1'>
                        <p>{job.jobType}</p>
                        </div>
                       
                        <div className='flex p-[2px] px-2 items-center  gap-2 rounded-full bg-red-300 text-red-600 text-xs w-auto sm:text-sm sm:px-1'>
                        <p>Featured</p>
                        </div>
                       
                    
                    </div>
                
              
                </div>
                </div>
                
            
            
            <div className='top-right flex justify-end gap-1  w-full pr-3  '>
                <Button variant={'outline'} ><img src='./BookmarkSimple.png'/></Button>
                <Button variant={'secondary'} className='w-auto'>Apply Now</Button>
            </div>


        </div>

        <div className='bottom flex flex-col gap-7 sm:flex sm:flex-row'>
           
            <div className='left-description flex flex-col gap-5 pb-5'>
                <div>
                    <h1 className='font-medium text-18'>Job Description</h1>
                    <div className='text-base font-normal leading-6  flex flex-col gap-2 '>
                    {job.description.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
                    </div>
                
                </div>
                <div>
                    <h1 className='font-medium text-18'>Requirements</h1>
                    <ul className='list-disc list-inside'>
                        {job.requirements.split(',').map((requirement, index) => (
                        <li key={index}>{requirement.trim()}</li>
                        ))}
                    </ul>
                
                </div>
                <div>
                    <h1 className='font-medium text-18'>Desirable</h1>
                    <ul className='list-disc list-inside'>
                        {job.desirable.split(',').map((desirable, index) => (
                        <li key={index}>{desirable.trim()}</li>
                        ))}
                        
                    </ul>
                
                </div>
                <div>
                    <h1 className='font-medium text-18'>Benifits</h1>
                    <ul className='list-disc list-inside'>
                        {job.benifits.split(',').map((benifit, index) => (
                        <li key={index}>{benifit.trim()}</li>
                        ))}
                        
                    </ul>

                
                </div>
                
            </div>
            <div className='right-cards flex flex-col items-center'>
                <div className='top-card flex w-[300]  p-8 justify-center items-center gap-10 rounded-lg border-2 border-primary-50 sm:w-[536px] '>
                    <div className='top-card-left'>
                        <div className='self-stretch text-gray-900 text-center font-sans text-base font-medium leading-6'>Salary (USD)</div>
                        <div className='text-green-500 text-center font-sans text-md font-medium leading-6 sm:text-lg'>{job.salary}</div>
                        <div className='self-stretch text-gray-500 text-center font-sans text-sm font-normal leading-5'>Yearly salary</div>
                    </div>
                    <div className='top-card-right flex flex-col items-center'>
                        <div className=''> <img src='./Map.png' className='w-[38px] h-[38px] flex-shrink-0'/></div>
                        <div className='text-green-500 text-center font-sans text-md font-medium leading-6 sm:text-lg'>Job Location</div>
                        <div className='self-stretch text-gray-500 text-center font-sans text-sm font-normal leading-5'>{job.location}</div>
                    </div>

                </div>
                <div className='bottom-card mt-8 inline-flex flex-col p-8 py-0 gap-6 rounded-lg border-2 border-primary-50'>
                    <div className='bottom-card-up flex flex-col gap-4 w-auto'>
                        <div className='w-[300px]  font-sans text-lg font-medium leading-7 pl-[-32px] pr-8 pt-9 sm:w-[472px] '>Job Overview</div>

                        <div className='flex justify-start gap-20 '>

                            <div className='flex flex-col items-center '>
                                <div> <img src='./Calendar.png' className='w-[32px] h-[32px] flex-shrink-0'/></div>
                                <div className='self-stretch text-gray-500 font-sans text-xs font-normal leading-5 uppercase'>Job Posted:</div>
                                <div className='font-sans text-sm font-medium leading-5 self-stretch'>{job.posted}</div>
                            </div>

                            <div className='flex flex-col items-center'>
                                <div> <img src='./Timer.png' className='w-[32px] h-[32px] flex-shrink-0'/></div>
                                <div className='self-stretch text-gray-500 font-sans text-xs font-normal leading-5 uppercase'>Job expire in:</div>
                                <div className='font-sans text-sm font-medium leading-5 self-stretch'>{job.expire}</div>
                            </div>

                            <div className='flex flex-col items-center'>
                                <div> <img src='./Stack.png' className='w-[32px] h-[32px] flex-shrink-0'/></div>
                                <div className='self-stretch text-gray-500 font-sans text-xs font-normal leading-5 uppercase'>Job Level:</div>
                                <div className='font-sans text-sm font-medium leading-5 self-stretch'>{job.level}</div>
                            </div>
                        </div>    

                            <div className='flex justify-start gap-20 pb-9'>
                                <div className='flex flex-col items-center'>
                                    <div> <img src='./Wallet.png' className='w-[32px] h-[32px] flex-shrink-0'/></div>
                                    <div className='self-stretch text-gray-500 font-sans text-xs font-normal leading-5 uppercase'>Experience</div>
                                    <div className='font-sans text-sm font-medium leading-5 self-stretch'>{job.experience}</div>
                                </div>

                                <div className='flex flex-col items-center'>
                                    <div> <img src='./briefcase.png' className='w-[32px] h-[32px] flex-shrink-0'/></div>
                                    <div className='self-stretch text-gray-500 font-sans text-xs font-normal leading-5 uppercase'>Education</div>
                                    <div className='font-sans text-sm font-medium leading-5 self-stretch'>{job.education}</div>
                                </div>

                            </div>
                        
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex justify-start font-sans text-lg font-medium leading-7'>Share this job</div>
                        <div className=' flex gap-1 pb-9  sm:flex sm:justify-evenly'>
                        <Button variant={'outline'}><img src='./LinkSimple.png'className='w-6 h-6'/> Copy Link</Button>
                        <Button variant={'outline'}><img src='./LinkedIn.png'className=' w-4 h-4 sm:w-5 h-5'/></Button>
                        <Button variant={'outline'}><img src='./FB.png'className='w-5 h-5'/></Button>
                        <Button variant={'outline'}><img src='./twitter.png'className='w-5 h-5'/></Button>
                        <Button variant={'outline'}><img src='./envelop.png'className='w-5 h-5'/></Button>

                        </div>
                        
                    </div>

                </div>


            </div>


        </div>


      
    </div>
    ))}
    </>
  );
};

export default JobDescription

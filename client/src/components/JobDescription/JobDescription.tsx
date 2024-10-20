import React from 'react'
import { Button } from '@/components/ui/button';


const JobDescription = () => {
  return (
    <div className=' flex flex-col justify-center   h-auto gap-5'>
        <div className=' top flex justify-between '>
            <div className='top-left flex justify-between gap-2'>
                <img src='./JobIcon.png' alt='company logo'  className='w-24 h-24 rounded-[100px] '/>
                <div className='pt-3 flex flex-col justify-center pl-3 gap-2'>
                    <h1 className='font-sans text-2xl font-medium leading-[32px] '>Senior UX Designer</h1>
                    <div className='flex justify-between gap-2 font-sans text-base font-normal leading-[28px]'>
                        <p>Facebook</p>
                        <div className='flex items-start gap-[10px] px-2 py-0 rounded-[3px] bg-green-500 text-white font-inter'>
                        <p>FULL-TIME</p>
                        </div>
                        <div className='flex p-[2px] px-2 items-start gap-2 rounded-full bg-red-300 text-red-600'>
                        <p>Featured</p>
                        </div>
                       
                    </div>
                </div>
                
              
            </div>
            
            
            <div className='top-right flex justify-between gap-2 pr-3'>
                <Button variant={'outline'} ><img src='./BookmarkSimple.png'/></Button>
                <Button variant={'secondary'}>Apply Now</Button>
            </div>


        </div>

        <div className='bottom flex gap-7 '>
           
            <div className='left-description flex flex-col gap-5 pb-5'>
                <div>
                    <h1 className='font-medium text-18'>Job Description</h1>
                    <div className='text-base font-normal leading-6  flex flex-col gap-2 '>
                        <div>Velstar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!</div>
                    
                        <div>Here at Velstar, we don't just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.</div>
                        <div>The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure and scalable features for our clients on the Shopify platform</div>
                        <div>Want to work with us? You're in good company!</div>
                    </div>
                
                </div>
                <div>
                    <h1 className='font-medium text-18'>Requirements</h1>
                    <ul className='list-disc list-inside'>
                        <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on</li>
                        <li>3+ years of experience in back-end development working either with multiple smaller projects simultaneously or large-scale applications</li>
                        <li>Experience with HTML, JavaScript, CSS, PHP, Symphony and/or Larave</li>
                        <li>orking regularly with APIs and Web Services (REST, GrapthQL, SOAP, etc)</li>
                        <li>Have experience/awareness in Agile application development, commercial off-the-shelf software, middleware, servers and storage, and database management.</li>
                        <li>Familiarity with version control and project management systems (e.g., Github, Jira)</li>
                        <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on</li>
                        <li>3+ years of experience in back-end development working either with multiple smaller projects simultaneously or large-scale applications</li>
                    </ul>
                
                </div>
                <div>
                    <h1 className='font-medium text-18'>Desirable</h1>
                    <ul className='list-disc list-inside'>
                        <li>Working knowledge of eCommerce platforms, ideally Shopify but also others e.g. Magento, WooCommerce, Visualsoft to enable seamless migrations.</li>
                        <li>Working knowledge of payment gateways</li>
                        <li>API platform experience / Building restful APIs</li>
                    </ul>
                
                </div>
                <div>
                    <h1 className='font-medium text-18'>Desirable</h1>
                    <ul className='list-disc list-inside'>
                        <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
                        <li>28 days holiday (including bank holidays) rising by 1 day per year PLUS an additional day off on your birthday28 days holiday (including bank holidays) rising by 1 day per year PLUS an additional day off on your birthday</li>
                        <li>Generous annual bonus.</li>
                        <li>Healthcare package</li>
                        <li>Paid community days to volunteer for a charity of your choice</li>
                        <li>£100 contribution for your own personal learning and development</li>
                        <li>Free Breakfast on Mondays and free snacks in the office</li>
                        <li>Access to Perkbox with numerous discounts plus free points from the company to spend as you wish.</li>
                        <li>Cycle 2 Work Scheme</li>
                        <li>Brand new MacBook Pro</li>
                        <li>Joining an agency on the cusp of exponential growth and being part of this exciting story.</li>
                    </ul>

                
                </div>
                
            </div>
            <div className='right-cards flex flex-col items-center'>
                <div className='top-card flex w-[536px]  p-8 justify-center items-center gap-10 rounded-lg border-2 border-primary-50'>
                    <div className='top-card-left'>
                        <div className='self-stretch text-gray-900 text-center font-sans text-base font-medium leading-6'>Salary (USD)</div>
                        <div className='text-green-500 text-center font-sans text-lg font-medium leading-6'>$100,000 - $120,000</div>
                        <div className='self-stretch text-gray-500 text-center font-sans text-sm font-normal leading-5'>Yearly salary</div>
                    </div>
                    <div className='top-card-right flex flex-col items-center'>
                        <div className=''> <img src='./Map.png' className='w-[38px] h-[38px] flex-shrink-0'/></div>
                        <div className='text-green-500 text-center font-sans text-lg font-medium leading-6'>Job Location</div>
                        <div className='self-stretch text-gray-500 text-center font-sans text-sm font-normal leading-5'>Dhaka, Bangladesh</div>
                    </div>

                </div>
                <div className='bottom-card mt-8 inline-flex flex-col p-8 py-0 gap-6 rounded-lg border-2 border-primary-50'>
                    <div className='bottom-card-up flex flex-col gap-4 w-auto'>
                        <div className='w-[472px]  font-sans text-lg font-medium leading-7 pl-[-32px] pr-8 pt-9 '>Job Overview</div>

                        <div className='flex justify-start gap-20 '>

                            <div className='flex flex-col items-center '>
                                <div> <img src='./Calendar.png' className='w-[32px] h-[32px] flex-shrink-0'/></div>
                                <div className='self-stretch text-gray-500 font-sans text-xs font-normal leading-5 uppercase'>Job Posted:</div>
                                <div className='font-sans text-sm font-medium leading-5 self-stretch'>14 Jun, 2021</div>
                            </div>

                            <div className='flex flex-col items-center'>
                                <div> <img src='./Timer.png' className='w-[32px] h-[32px] flex-shrink-0'/></div>
                                <div className='self-stretch text-gray-500 font-sans text-xs font-normal leading-5 uppercase'>Job expire in:</div>
                                <div className='font-sans text-sm font-medium leading-5 self-stretch'>Entry Level</div>
                            </div>

                            <div className='flex flex-col items-center'>
                                <div> <img src='./Stack.png' className='w-[32px] h-[32px] flex-shrink-0'/></div>
                                <div className='self-stretch text-gray-500 font-sans text-xs font-normal leading-5 uppercase'>Job Level:</div>
                                <div className='font-sans text-sm font-medium leading-5 self-stretch'>Entry Level</div>
                            </div>
                        </div>    

                            <div className='flex justify-start gap-20 pb-9'>
                                <div className='flex flex-col items-center'>
                                    <div> <img src='./Wallet.png' className='w-[32px] h-[32px] flex-shrink-0'/></div>
                                    <div className='self-stretch text-gray-500 font-sans text-xs font-normal leading-5 uppercase'>Experience</div>
                                    <div className='font-sans text-sm font-medium leading-5 self-stretch'>$50k-80k/month</div>
                                </div>

                                <div className='flex flex-col items-center'>
                                    <div> <img src='./briefcase.png' className='w-[32px] h-[32px] flex-shrink-0'/></div>
                                    <div className='self-stretch text-gray-500 font-sans text-xs font-normal leading-5 uppercase'>Education</div>
                                    <div className='font-sans text-sm font-medium leading-5 self-stretch'>Graduation</div>
                                </div>

                            </div>
                        
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex justify-start font-sans text-lg font-medium leading-7'>Share this job</div>
                        <div className='flex justify-evenly pb-9'>
                        <Button variant={'outline'}><img src='./LinkSimple.png'className='w-6 h-6'/> Copy Link</Button>
                        <Button variant={'outline'}><img src='./LinkedIn.png'className='w-5 h-5'/></Button>
                        <Button variant={'outline'}><img src='./FB.png'className='w-5 h-5'/></Button>
                        <Button variant={'outline'}><img src='./twitter.png'className='w-5 h-5'/></Button>
                        <Button variant={'outline'}><img src='./envelop.png'className='w-5 h-5'/></Button>

                        </div>
                        
                    </div>

                </div>


            </div>


        </div>


      
    </div>
  )
}

export default JobDescription

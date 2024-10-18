import React from 'react'
import Image from 'next/image'

import Security from '@/../public/security.png'
import Invest from '@/../public/investing.png'
import Multiple from '@/../public/multiple.png'
import Frame from '@/../public/Frame.png'
import elipse from '@/../public/Ellipse.png'

function page() {
  return (
    
    <div className='flex flex-col items-center h-screen'>
        
        <div className='text-xl font-bold mb-6'>What do we offer?</div>

        <div className='flex md:flex-row flex-col md:gap-28 gap-14 font-medium mb-8'>

        <div className='flex flex-row items-center gap-4'>
            <Image
            src={Security}
            alt=''
            width={40}
            height={40}
            />

            <p>Security Guarantee </p>
        </div>

        <div className='flex flex-row items-center gap-4'>
            <Image
            src={Invest}
            alt=''
            width={40}
            height={40}
            />

            <p>Investing </p>
        </div>

        <div className='flex flex-row items-center gap-4'>
            <Image
            src={Multiple}
            alt=''
            width={40}
            height={40}
            />

            <p>Multiple Method </p>
        </div>

        </div>

        <div className='flex w-3/4 overflow-x-auto gap-8 px-4 '>
        

        <div className="card bg-green-200 style={{ backgroundColor: '#DCFCE0' }} text-neutral-content w-80 flex-shrink-0">
            <div className='p-2'>
            <Image
            src={Frame}
            alt=''
            width={50}
            height={50}
            />
            </div>
        <div className="card-body text-left justify-start text-gray-900">
            <div className='text-sm'>"Great session! Dani was super helpful. She shared some practical advice on how can lorem ip we go about refining our service offerings."</div>
        <div className="card-actions justify-start">
            <Image
            src={elipse}
            alt=''
            width={40}
            height={40}
            />
            <div className='flex flex-col'>
            <div className='font-bold'>Hadid Khan</div>
            <div className='text-xs font-light'>UI/UX Designer</div>
            </div>
        </div>
        </div>
        </div>


        <div className="card bg-green-200 style={{ backgroundColor: '#DCFCE0' }} text-neutral-content w-80 flex-shrink-0">
            <div className='p-2'>
            <Image
            src={Frame}
            alt=''
            width={50}
            height={50}
            />
            </div>
        <div className="card-body text-left justify-start text-gray-900">
            <div className='text-sm'>"Great session! Dani was super helpful. She shared some practical advice on how can lorem ip we go about refining our service offerings."</div>
        <div className="card-actions justify-start">
            <Image
            src={elipse}
            alt=''
            width={40}
            height={40}
            />
            <div className='flex flex-col'>
            <div className='font-bold'>Hadid Khan</div>
            <div className='text-xs font-light'>UI/UX Designer</div>
            </div>
        </div>
        </div>
        </div>


        <div className="card bg-green-200 style={{ backgroundColor: '#DCFCE0' }} text-neutral-content w-80 flex-shrink-0">
            <div className='p-2'>
            <Image
            src={Frame}
            alt=''
            width={50}
            height={50}
            />
            </div>
        <div className="card-body text-left justify-start text-gray-900">
            <div className='text-sm'>"Great session! Dani was super helpful. She shared some practical advice on how can lorem ip we go about refining our service offerings."</div>
        <div className="card-actions justify-start">
            <Image
            src={elipse}
            alt=''
            width={40}
            height={40}
            />
            <div className='flex flex-col'>
            <div className='font-bold'>Hadid Khan</div>
            <div className='text-xs font-light'>UI/UX Designer</div>
            </div>
        </div>
        </div>
        </div>


        <div className="card bg-green-200 style={{ backgroundColor: '#DCFCE0' }} text-neutral-content w-80 flex-shrink-0">
            <div className='p-2'>
            <Image
            src={Frame}
            alt=''
            width={50}
            height={50}
            />
            </div>
        <div className="card-body text-left justify-start text-gray-900">
            <div className='text-sm'>"Great session! Dani was super helpful. She shared some practical advice on how can lorem ip we go about refining our service offerings."</div>
        <div className="card-actions justify-start">
            <Image
            src={elipse}
            alt=''
            width={40}
            height={40}
            />
            <div className='flex flex-col'>
            <div className='font-bold'>Hadid Khan</div>
            <div className='text-xs font-light'>UI/UX Designer</div>
            </div>
        </div>
        </div>
        </div>


        <div className="card bg-green-200 style={{ backgroundColor: '#DCFCE0' }} text-neutral-content w-80 flex-shrink-0">
            <div className='p-2'>
            <Image
            src={Frame}
            alt=''
            width={50}
            height={50}
            />
            </div>
        <div className="card-body text-left justify-start text-gray-900">
            <div className='text-sm'>"Great session! Dani was super helpful. She shared some practical advice on how can lorem ip we go about refining our service offerings."</div>
        <div className="card-actions justify-start">
            <Image
            src={elipse}
            alt=''
            width={40}
            height={40}
            />
            <div className='flex flex-col'>
            <div className='font-bold'>Hadid Khan</div>
            <div className='text-xs font-light'>UI/UX Designer</div>
            </div>
        </div>
        </div>
        </div>


        <div className="card bg-green-200 style={{ backgroundColor: '#DCFCE0' }} text-neutral-content w-80 flex-shrink-0">
            <div className='p-2'>
            <Image
            src={Frame}
            alt=''
            width={50}
            height={50}
            />
            </div>
        <div className="card-body text-left justify-start text-gray-900">
            <div className='text-sm'>"Great session! Dani was super helpful. She shared some practical advice on how can lorem ip we go about refining our service offerings."</div>
        <div className="card-actions justify-start">
            <Image
            src={elipse}
            alt=''
            width={40}
            height={40}
            />
            <div className='flex flex-col'>
            <div className='font-bold'>Hadid Khan</div>
            <div className='text-xs font-light'>UI/UX Designer</div>
            </div>
        </div>
        </div>
        </div>

        </div>
        
    </div>
  )
}

export default page
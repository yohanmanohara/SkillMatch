import React from 'react'
import Image from 'next/image'
import Search from '@/../public/search.png'
import Map from '@/../public/MapPin.png'
import Crosshair from '@/../public/Crosshair.png'
import { Button } from "@/components/ui/button"
import Sliders from '@/../public/Sliders.png'
import { Input } from "@/components/ui/input"

function page() {
  return (
    <div className='flex flex-row justify-between  bg-white w-186 h-24 text-gray-900 rounded-md m-10 p-5'>
        <div className='flex flex-row gap-4 items-center'>
            <Image
            src={Search}
            alt=''
            width={20}
            height={20}
            />

            <Input type="search" className='border-none outline-none shadow-none' placeholder="Search by: Job tittle, Position, Keyword..." />
        
        </div>

        <div className='h-12 border-l-2 border-gray-500'></div>

        <div className='flex flex-row gap-40 items-center'>
            <div className='flex flex-row gap-4 items-center'>
            <Image
            src={Map}
            alt=''
            width={20}
            height={20}
            />
            <Input type="find city" className='border-none outline-none shadow-none' placeholder="City, state or zip code" />

            </div>
            
            <div>
            <Image
            src={Crosshair}
            alt=''
            width={20}
            height={20}
            />
            </div>
        </div>

        <div className=' flex flex-row items-center gap-5'>
        <Button variant="outline" className='gap-2'>
        <Image
                src={Sliders}
                alt=''
                width={20}
                height={20}
        />
            Filter
        </Button>
        <Button>FindJob</Button>
        
        </div>
        
    </div>
  )
}

export default page
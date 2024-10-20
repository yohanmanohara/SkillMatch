import React from 'react'
import Logo from "/public/logo.svg"
import Image from 'next/image'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

const NavigationBar = () => {
  return (
    <div className=" bg-opacity-85 backdrop-blur-lg bg-blend-darken h-20 w-full flex justify-center px-4 fixed z-50 text-primary-0 text-stroke-1">
    <div className="w-full max-w-[1206px] h-full flex justify-between items-center ">
      <div >
      <Image src="/favicon.png" width={30} height={30} alt="logo" />

      </div>
      <div className='hidden lg:block'>
        <ul className="flex justify-center items-center space-x-8">
          <li className=" text-primary-0 hover:text-gray-300 cursor-pointer"><Link href={'/ourproducts'}>Home</Link></li>
          <li className=" text-primary-0 hover:text-gray-300 cursor-pointer"><Link href={'/services'}>services</Link></li>
          <li className=" text-primary-0 hover:text-gray-300 cursor-pointer"><Link href={'/projects'}>Abount us</Link></li>
          <li className=" text-primary-0 hover:text-gray-300 cursor-pointer"><Link href={'/blog'}>Blog</Link></li>
          <Button variant="secondary" size="default">Contact Us</Button>
        </ul>
      </div>
    </div>
  </div>
  

  

  
  

  )
}

export default NavigationBar
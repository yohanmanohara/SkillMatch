import React from 'react'
import Navbar from '../components/landing/navbar'
import Hero from '@/components/landing/hero'


const page = () => {
  return (
    <main> 
       <div  className='bg-white  '>
      <Navbar />
    </div>
    <div className='flex align-top'>
    <Hero />
    </div>
    
    </main>
   
  )
}

export default page

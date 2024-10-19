import React from 'react'
import Navbar from '../components/landing/navbar'
import Hero from '@/components/landing/hero'
import Footer from '@/components/layout/footer'
import Buttonfilter from '@/components/landing/buttonfilter';
const page = () => {
  return (
    <main> 
       <div  className='bg-white  '>
      <Navbar />
    </div>
    <div className='flex align-top items-start'>
    <Hero/>
    </div>
    <Buttonfilter />
    <Footer>
      
    </Footer>
    </main>
   
  )
}

export default page

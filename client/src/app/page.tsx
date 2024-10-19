import React from 'react'
import Navbar from '../components/landing/navbar'
import Hero from '@/components/landing/hero'
import Footer from '@/components/layout/footer'

const page = () => {
  return (
    <main> 
       <div  className='bg-white  '>
      <Navbar />
    </div>
    <div className='flex align-top items-start'>
    <Hero/>
    </div>
    <Footer>
      
    </Footer>
    </main>
   
  )
}

export default page

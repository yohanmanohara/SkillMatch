import React from 'react'
import Navbar from '../components/landing/navbar'
import Hero from '@/components/landing/hero'
import Footer from '@/components/layout/footer'
import Buttonfilter from '@/components/landing/buttonfilter';
import JobCards from '@/components/landing/JobCards';
import  Container  from '@/components/common/container';
import Customerfeedback from '@/components/landing/customerfeedback';
import Contactus from "@/components/landing/Getintouch";
import JobDescription from '@/components/JobDescription/JobDescription';

const page = () => {
  return (
    <> 
       
      
       <Navbar />
       
    <Hero/>
    <Buttonfilter />
    
    <Container>
    <JobCards/>
    </Container>
   
    <Container>
    <Customerfeedback/>
    
    </Container>

    <Container>
    <Contactus/>
    </Container>

    <Container>
    <JobDescription/>
    </Container>

   
      
    <Footer/> 
    </>
   
  )
}

export default page

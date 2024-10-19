import React from 'react'
import Navbar from '../components/landing/navbar'
import Hero from '@/components/landing/hero'
import Footer from '@/components/layout/footer'
import Buttonfilter from '@/components/landing/buttonfilter';
import JobCards from '@/components/landing/JobCards';
import  Container  from '@/components/common/container';
import Customerfeedback from '@/components/landing/customerfeedback';
import Contactus from "@/components/landing/Getintouch";
import Faq from "@/components/landing/faq";
const page = () => {
  return (
    <> 
       
    <Navbar />
    <Hero/>
    <Buttonfilter />
    
    <Container>
    <JobCards/>
    </Container>
   
    <Customerfeedback/>
    <Container>
    <Faq/>
    </Container>
    <Contactus/>
    <Footer>
      
    </Footer>
    </>
   
  )
}

export default page

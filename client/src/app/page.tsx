import React from 'react'
import Survey from '@/components/layouts/LandingPage/Survey';
import Navbar from "@/components/layouts/LandingPage/Navbar";

import JobCardSection from '@/components/layouts/LandingPage/JobCardSection';
import Features from '@/components/layouts/LandingPage/Features';
import Testimonials from '@/components/layouts/LandingPage/Testimonials';
import FAQ from '@/components/layouts/LandingPage/FAQ';
import Footer from '@/components/layouts/LandingPage/Footer';
import Container from '@/components/layouts/LandingPage/Container';
import CommonSearchFilter from '@/components/layouts/cards/CommonSearchFilter';

const page = () => {
  return (
    <div>
      <Survey />
      <Navbar />
      <Container>
        <div className='flex flex-col items-center justify-center min-w-full gap-14'>
     
          {/* <CommonSearchFilter></CommonSearchFilter> */}
          <JobCardSection></JobCardSection>
          <Features></Features>
          <Testimonials></Testimonials>
          <FAQ></FAQ>
          <Footer/>
        </div>
      </Container>
    </div>
  )
}

export default page

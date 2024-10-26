import React from 'react'
import Footer from '@/components/layout/footer'
import Container from '@/components/common/container'
import JobDescription from '@/components/JobDescription/JobDescription'
import Navbar from '@/components/landing/navbar'
function page() {
  return (
    <div>
         <Navbar />
      <Container>
      <JobDescription/>
    </Container>
    <Footer>
      
    </Footer>
    </div>
  )
}

export default page

import React from 'react'
import Cards from '@/components/landing/JobCards'
import Footer from '@/components/layout/footer'
import  Container from '@/components/common/container'
import Navbar from '@/components/landing/navbar'
function page() {
  return (
    <div className=''>
        <Navbar />
        <Container>
        <Cards/>
        </Container>
        <Footer/>
    </div>
  )
}

export default page

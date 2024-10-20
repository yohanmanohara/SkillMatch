import React from 'react'
import Cards from '@/components/landing/JobCards'
import Footer from '@/components/layout/footer'
import  Container from '@/components/common/container'
function page() {
  return (
    <div className=''>
        <Container>
        <Cards/>
        </Container>
        <Footer/>
    </div>
  )
}

export default page

import React from 'react'
import Image from 'next/image'

import logo from '../../../../public/logo.png'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
      <div className='flex items-start justify-between w-full bg bg-primary-200'>
        <div className='flex flex-col items-center justify-center flex-1'>
          <Image src={logo} alt='logo' width={75} className='border-0 rounded-xl'></Image>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. est cumque, nulla mollitia sit.</div>
        </div>
        <div className='flex flex-col items-center justify-center gap-4 flex-1'>
          <div>links</div>
          <div>links</div>
          <div>links</div>
          <div>links</div>
        </div>
        <div className='flex flex-col items-center justify-center flex-1'>
          <div>Follow Us on</div>
          <div className='flex items-center justify-center gap-4'>
            <LinkedInIcon></LinkedInIcon>
            <InstagramIcon></InstagramIcon>
            <FacebookIcon></FacebookIcon>
          </div>
        </div>
      </div>
  )
}

export default Footer

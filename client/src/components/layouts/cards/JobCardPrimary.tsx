import Image from 'next/image'
import React from 'react'
import logo from '../../../../public/logo.png'
import save from "../../../../public/save.png";
import saved from "../../../public/saved.png";
import Button from '../../Buttons/Buttons';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const JobCard = () => {

  
  
  return (
    <div className='flex flex-col items-start justify-center border-4 border-primary-800 rounded-xl shadow-xl w-[350px] gap-6 p-4'>
      <div className='flex items-center justify-between w-full'>
        <Image src={logo} alt='' width={50} className='border-0 rounded-xl'></Image>
        <div className='flex items-center justify-center gap-2'>
          <div>saved</div>
          <Image src={save} alt=''></Image>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div>
          <div>Spotify</div>
          <div className=''>5 days ago</div>
        </div>
        <div className='flex gap-2'>
          <div className='bg-accent-400 px-2 border-0 rounded-md'>tags</div>
          <div className='bg-accent-400 px-2 border-0 rounded-md'>tags</div>
        </div>
        <div className='leading-5'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
        </div>
      </div>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col items-start justify-center'>
          <div>$120/hr</div>
          <div><LocationOnIcon fontSize='small'></LocationOnIcon> Location</div>
        </div>
        <Button variant={'primary'} size={'medium'}>Apply</Button>
      </div>
    </div>
  )
}

export default JobCard
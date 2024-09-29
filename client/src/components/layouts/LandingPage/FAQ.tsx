import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Container from './Container';

const QandA = () => {
  return (
    <Container>
      <div className='flex items-start justify-center'>
        <div className='flex flex-col gap-4'>
          <div className='text-primary-800 font-bold text-xl'>support</div>
          <div className=''>FAQ</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi consequuntur omnis fugiat aliquid nobis? Amet laboriosam non fugit aliquid quidem. Perspiciatis, reiciendis neque nisi reprehenderit at maxime cum rerum quasi?</div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-center flex-col'>
            <div className='flex items-center justify-between w-full'>
              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              <AddCircleOutlineIcon>  </AddCircleOutlineIcon>
            </div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
          </div>
          <div className='flex items-center justify-center flex-col'>
            <div className='flex items-center justify-between w-full'>
              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              <AddCircleOutlineIcon>  </AddCircleOutlineIcon>
            </div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='flex items-center justify-center flex-col'>
              <div className='flex items-center justify-between w-full'>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                <AddCircleOutlineIcon></AddCircleOutlineIcon>
              </div>
              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default QandA

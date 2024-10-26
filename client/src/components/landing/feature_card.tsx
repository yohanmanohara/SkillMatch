import React from 'react'
import Image from 'next/image'

//importing image into a variable
import logo from '@/../public/logo.png'

const feature_card = () => {
  return (
    <div className='flex flex-col items-center justify-center border-0 rounded-lg bg-green-500 gap-6'>
        <div className='text-xl font-bold'>Basic dialog title</div>
        <div className='px-10'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione omnis officia, delectus error deleniti neque pariatur ipsa explicabo accusamus molestias quidem accusantium debitis nesciunt dolore? Blanditiis tempore fuga porro ab?</div>
        <div className='flex items-center justify-center gap-4 text-lg font-bold'>
            <div>Action 1</div>
            <div>Action 2</div>
        </div>
        <Image src={logo} alt='logo'></Image>
        
    </div>
  )
}

export default feature_card
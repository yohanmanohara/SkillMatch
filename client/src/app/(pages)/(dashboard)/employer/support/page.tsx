import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function page() {
  return (
    <div className=' flex flex-col justify-evenly gap-10'>
      <div className='top'>
        <div className='font-semibold text-[40px] leading-[normal]'>Need help? We’ve got your back</div>
      </div>

      <div className='bottom flex flex-col justify-evenly gap-10 '>
        <div className='flex justify-evenly '>
        <Link href={'#'} className='card p-10    border-[3px] border-solid rounded-[10px] border-[#21C452] flex flex-col justify-center items-center '>
            <div>
              <Image src='/puzzle.png' alt='support' width={75}  height={75}/>
            </div>
            <div className='flex flex-col justify-evenly space-y-1'>
              <div className='text-[14px] leading-[normal] flex justify-center'>Getting Started</div>
              <div className='text-[12px] leading-[normal] flex justify-center'>Start off the right foot!</div>
            </div>
        </Link>

        <Link href={'#'} className='card p-10   border-[3px] border-solid rounded-[10px] border-[#21C452] flex flex-col justify-center items-center '>
            <div>
              <Image src='/vector.png' alt='support' width={75}  height={75}/>
            </div>
            <div className='flex flex-col justify-evenly space-y-1'>
              <div className='text-[14px] leading-[normal] flex justify-center'> Account </div>
              <div className='text-[12px] leading-[normal] flex justify-center'>Start off the right foot!</div>
            </div>
        </Link>

        <Link href={'#'} className='card p-10   border-[3px] border-solid rounded-[10px] border-[#21C452] flex flex-col justify-center items-center '>
            <div>
              <Image src='/message.png' alt='support' width={75}  height={75}/>
            </div>
            <div className='flex flex-col justify-evenly space-y-1'>
              <div className='text-[14px] leading-[normal] flex justify-center'>F.A.Q</div>
              <div className='text-[12px] leading-[normal] flex justify-center'>Start off the right foot!</div>
            </div>
        </Link>

        </div>

        <div className='flex justify-evenly'>
        <Link href={'#'} className='card p-10    border-[3px] border-solid rounded-[10px] border-[#21C452] flex flex-col justify-center items-center '>
            <div>
              <Image src='/shield.png' alt='support' width={75}  height={75}/>
            </div>
            <div className='flex flex-col justify-evenly space-y-1'>
              <div className='text-[14px] leading-[normal] flex justify-center'>Security</div>
              <div className='text-[12px] leading-[normal] flex justify-center'>Start off the right foot!</div>
            </div>
        </Link>

        <Link href={'#'} className='card p-10   border-[3px] border-solid rounded-[10px] border-[#21C452] flex flex-col justify-center items-center '>
            <div>
              <Image src='/community.png' alt='support' width={75}  height={75}/>
            </div>
            <div className='flex flex-col justify-evenly space-y-1'>
              <div className='text-[14px] leading-[normal] flex justify-center'>Community</div>
              <div className='text-[12px] leading-[normal] flex justify-center'>Start off the right foot!</div>
            </div>
        </Link>

        <Link href={'#'} className='card p-10    border-[3px] border-solid rounded-[10px] border-[#21C452] flex flex-col justify-center items-center '>
            <div>
              <Image src='/creditcard.png' alt='support' width={75}  height={75}/>
            </div>
            <div className='flex flex-col justify-evenly space-y-1'>
              <div className='text-[14px] leading-[normal] flex justify-center'>Billing</div>
              <div className='text-[12px] leading-[normal] flex justify-center'>Start off the right foot!</div>
            </div>
        </Link> 
        </div>

      
        
        

       


      </div>
      

    </div>
  )
}

export default page

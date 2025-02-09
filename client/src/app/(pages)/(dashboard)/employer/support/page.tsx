import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function page() {
  return (
    <div className=' flex flex-col justify-evenly gap-10'>
      <div className='top'>
        <div className='font-semibold text-[40px] leading-[normal]'>Need help? We&apos;ve got your back</div>
      </div>
      <div className='bottom flex flex-col justify-evenly gap-7'>
        <div className=' flex flex-wrap gap-7   justify-evenly  '>
          {[
        { href: './profile', src: '/puzzle.png', alt: 'support', title: 'Getting Started', description: 'Start off the right foot!' },
        { href: './profile', src: '/vector.png', alt: 'support', title: 'Account', description: 'Start off the right foot' },
        { href: '#', src: '/message.png', alt: 'support', title: 'F.A.Q', description: 'Start off the right foot' },
        
          ].map((item, index) => (
        <Link key={index} href={item.href} className='card p-10  border-[3px] border-solid rounded-[10px] border-[#21C452] flex flex-col justify-center items-center transition-transform duration-300 hover:scale-105'>
          <div>
            <Image src={item.src} alt={item.alt} width={75} height={75} />
          </div>
          <div className='flex flex-col justify-evenly space-y-1'>
            <div className='text-[14px] leading-[normal] flex justify-center'>{item.title}</div>
            <div className='text-[12px] leading-[normal] flex justify-center'>{item.description}</div>
          </div>
        </Link>
          ))}
        </div>
        
        <div className='flex flex-wrap gap-7 justify-evenly '>
          {[
        
        { href: '#', src: '/shield.png', alt: 'support', title: 'Security', description: 'Start off the right foot' },
        { href: '#', src: '/community.png', alt: 'support', title: 'Community', description: 'Start off the right foot' },
        { href: '#', src: '/creditcard.png', alt: 'support', title: 'Billing', description: 'Start off the right foot' }
          ].map((item, index) => (
        <Link key={index} href={item.href} className='card p-10 border-[3px] border-solid rounded-[10px] border-[#21C452] flex flex-col justify-center items-center transition-transform duration-300 hover:scale-105'>
          <div>
            <Image src={item.src} alt={item.alt} width={75} height={75} />
          </div>
          <div className='flex flex-col justify-evenly space-y-1'>
            <div className='text-[14px] leading-[normal] flex justify-center'>{item.title}</div>
            <div className='text-[12px] leading-[normal] flex justify-center'>{item.description}</div>
          </div>
        </Link>
          ))}
        </div>
      </div>
      

    </div>
  )
}

export default page

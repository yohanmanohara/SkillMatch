import React from 'react';
import Image from 'next/image';
import Phone from '@/../public/phone.png';
import Address from '@/../public/address.png';
import Email from '@/../public/email.png';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



const contactDetails = [
  {
    id: 1,
    icon: Phone,
    label: 'PHONE:',
    value: '+2348141898014',
  },
  {
    id: 2,
    icon: Address,
    label: 'ADDRESS:',
    value: 'Challenge, Ibadan, Nigeria',
  },
  {
    id: 3,
    icon: Email,
    label: 'EMAIL:',
    value: 'iremiodeneye126@gmail.com',
  },
];

function GetInTouch() {
  return (
    <>
    <div className='flex flex-row bg-green-200 rounded-md w-auto h-96 p-24 m-10 gap-48 items-center justify-between'>

    <div>
      {contactDetails.map(({ id, icon, label, value }) => (
        <div key={id} className='flex flex-row gap-4 items-center mb-6'>
          <Image
            src={icon}
            alt=''
            width={38}
            height={38}
          />
          <div className="h-12 border-l-2 border-gray-500"></div>
          <div className='flex flex-col text-gray-900'>
            <div className='font-bold'>{label}</div>
            <div className='text-sm'>{value}</div>
          </div>
        </div>
      ))}
    </div>

    <div className='flex flex-col gap-4'>
    
    <div className='flex flex-row gap-8'>
        <Input type="name" placeholder="Name" />
        <Input type="email" placeholder="Email" />
    </div>

    <Input type="subject" placeholder="Subject" />
    

    
    <Textarea placeholder="Message"  className="resize-none" />

    <Button type="submit">Submit</Button>

    </div>

    </div>
    </>
  );
}

export default GetInTouch;

import React from 'react';
import Image from 'next/image';

function Page() {
  return (
    <>
    <div className='flex flex-row'>

    <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </div>

    <div>
      <div className='flex flex-row items-center'>
        <div className='text-lg'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.

          <div className='text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </div>

        </div>

        <div>
          <Image
            src="/minus-circle.png"
            alt=''
            width={20}
            height={20}
          />
        </div>
      </div>

    <div>
        < div className='flex flex-row'>
        <div className='text-lg'>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>

        <div>
        <Image
         src="/add-circle.png"
         alt=''
         width={20}
         height={20}
        />
        </div>
        </div>


        < div className='flex flex-row'>
        <div className='text-lg'>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>

        <div>
        <Image
         src="/add-circle.png"
         alt=''
         width={20}
         height={20}
        />
        </div>
        </div>

        < div className='flex flex-row'>
        <div className='text-lg'>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>

        <div>
        <Image
         src="/add-circle.png"
         alt=''
         width={20}
         height={20}
        />
        </div>
        </div>

        < div className='flex flex-row'>
        <div className='text-lg'>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>

        <div>
        <Image
         src="/add-circle.png"
         alt=''
         width={20}
         height={20}
        />
        </div>
        </div>

        < div className='flex flex-row'>
        <div className='text-lg'>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>

        <div>
        <Image
         src="/add-circle.png"
         alt=''
         width={20}
         height={20}
        />
        </div>
        </div>
    </div>
       

    </div>

    </div>
   

    </>
  );
}

export default Page;
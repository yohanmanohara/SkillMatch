import React from 'react';
import Image from 'next/image';
function Page() {
  // Array of data for each card
  const cardData = [
    {
      title: 'Basic dialog title 1',
      description: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.',
      image:'/icon.png'
    },
    {
      title: 'Basic dialog title 2',
      description: 'Dialogs can be used to notify users, provide warnings, or to ask for confirmations.',
     
    },
    {
      title: 'Basic dialog title 3',
      description: 'They can contain text, images, or forms that require user input.',
      
    }
  ];

  return (
    <>
      <div className='mb-6'>
        <h1>Features</h1>
      </div>

      <div>
        <div className='flex space-x-4 p-4 w-max'>
          {cardData.map((card, index) => (
            <div
              key={index}
              className='card bg-green-200 text-neutral-content w-80'
              style={{ backgroundColor: '#DCFCE0' }}
            >
              <div className='card-body text-left text-gray-900'>
                <h2 className='card-title'>{card.title}</h2>
                <div className='text-sm'>{card.description}</div>
               
              </div>
              {card.image && (
                <Image
                  src={card.image}
                  alt={card.title}
                  width={100} // Adjust width and height as needed
                  height={100}
                  className='w-full h-40 object-cover'
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;

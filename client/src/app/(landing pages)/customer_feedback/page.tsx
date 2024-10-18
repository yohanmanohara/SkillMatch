import React from 'react';

function Page() {
  // Array of data for each card
  const cardData = [
    {
      title: 'Basic dialog title 1',
      description: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.',
      actions: ['Action 1', 'Action 2'],
    },
    {
      title: 'Basic dialog title 2',
      description: 'Dialogs can be used to notify users, provide warnings, or to ask for confirmations.',
      actions: ['Confirm', 'Cancel'],
    },
    {
      title: 'Basic dialog title 3',
      description: 'They can contain text, images, or forms that require user input.',
      actions: ['Submit', 'Close'],
    },
    {
      title: 'Basic dialog title 4',
      description: 'Ensure dialog contents are concise and meaningful for better user experience.',
      actions: ['Proceed', 'Back'],
    },
    {
      title: 'Basic dialog title 5',
      description: 'Use dialogs sparingly to avoid overwhelming users with too many prompts.',
      actions: ['Agree', 'Disagree'],
    },
    {
      title: 'Basic dialog title 6',
      description: 'Remember to follow accessibility guidelines when using dialogs in your application.',
      actions: ['Ok', 'Dismiss'],
    },
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
                <div className='card-actions justify-end gap-8'>
                  {card.actions.map((action, actionIndex) => (
                    <div key={actionIndex}>{action}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;

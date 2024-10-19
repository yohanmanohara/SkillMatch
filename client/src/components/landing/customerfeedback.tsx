import Image from 'next/image';
import React from 'react';
import human_icon from '@/../public/Ellipse.png';
import comma_icon from '@/../public/Frame.png';
import Security from '@/../public/security.png'
import Invest from '@/../public/investing.png'
import Multiple from '@/../public/multiple.png'

const feedbacks = [
  {
    id: 1,
    feedback: "Great session! She shared some practical advice on how we can go about refining our service offerings.",
    name: "Eaden Noava",
    title: "Software Developer",
    humanIcon: human_icon,
    commaIcon: comma_icon,
  },
  {
    id: 2,
    feedback: "The advice I received was invaluable.Cool session. It helped me shape my project better.",
    name: "Zeke Stone",
    title: "UI/UX Designer",
    humanIcon: human_icon,
    commaIcon: comma_icon,
  },
  {
    id: 3,
    feedback: "Insightful session! Definitely going to apply the ideas shared during the meeting.Thank you for hosting such a event",
    name: "John Doe",
    title: "Product Manager",
    humanIcon: human_icon,
    commaIcon: comma_icon,
  },
];


const Client_Feedback = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center pt-12'>
    <div className='font-bold text-xl'>What do we offer?</div>
    <div className='flex flex-row gap-20 my-9'>
        <div className='flex flex-row font-bold gap-6 items-center'>
        <Image
        src={Security}
        alt=''
        width={40}
        height={40}
        />

        <div>Security Guarantee </div>
        </div>

        <div className='flex flex-row font-bold gap-6 items-center'>
        <Image
        src={Invest}
        alt=''
        width={40}
        height={40}
        />

        <div>Investing</div>
        </div>

        <div className='flex flex-row font-bold gap-6 items-center'>
        <Image
        src={Multiple}
        alt=''
        width={40}
        height={40}
        />

        <div>Multiple Method</div>
        </div>
    </div>
    </div>

    <div className='flex flex-wrap gap-6 justify-center'>
      {feedbacks.map(({ id, feedback, name, title, humanIcon, commaIcon }) => (
        <div key={id} className='flex flex-col items-start justify-center gap-10 text-black border-0 rounded-xl w-[300px] bg-[#BEF4CE] px-8 py-4'>
          <Image src={commaIcon} alt='' />
          <div>{feedback}</div>
          <div className='flex items-center justify-center gap-4'>
            <Image src={humanIcon} alt='' />
            <div className='flex flex-col'>
              <div className='font-bold'>{name}</div>
              <div className='text-sm'>{title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    </>
  );
};

export default Client_Feedback;


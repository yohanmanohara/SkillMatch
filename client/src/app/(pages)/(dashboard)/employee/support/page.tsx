import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardItem {
  href: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

const Page: React.FC = () => {
  const firstRowItems: CardItem[] = [
    {
      href: 'gettingStarted',
      src: '/puzzle.png',
      alt: 'Getting Started',
      title: 'Getting Started',
      description: 'Start off the right foot!',
    },
    {
      href: 'account',
      src: '/vector.png',
      alt: 'Account',
      title: 'Account',
      description: 'Set up your account',
    },
    {
      href: 'faq',
      src: '/message.png',
      alt: 'F.A.Q',
      title: 'F.A.Q',
      description: 'Common questions answered',
    },
  ];

  const secondRowItems: CardItem[] = [
    {
      href: 'security',
      src: '/shield.png',
      alt: 'Security',
      title: 'Security',
      description: 'Protect your account',
    },
    {
      href: 'community',
      src: '/community.png',
      alt: 'Community',
      title: 'Community',
      description: 'Engage with others',
    },
    {
      href: 'billing',
      src: '/creditcard.png',
      alt: 'Billing',
      title: 'Billing',
      description: 'Manage your payments',
    },
  ];

  // Combine the rows into one list of items for easy reference
  const allItems = [...firstRowItems, ...secondRowItems];

  // Join all descriptions into a single string to pass in the URL
  const descriptions = allItems.map(item => item.description).join('|');

  return (
    <div className="flex flex-col justify-evenly gap-10">
      <div className="top">
        <div className="font-semibold text-[40px] leading-[normal]">
          Need help? We&apos;ve got your back
        </div>
      </div>
      <div className="bottom flex flex-col justify-evenly gap-7">
        <div className="flex flex-wrap gap-7 justify-evenly">
          {allItems.map((item, index) => (
            <Link
            key={index}
            href={`/documentary?content=${item.href}&description=${encodeURIComponent(item.description)}`}
            target="_blank" // Open in new tab
            rel="noopener noreferrer" // Security best practice
            className="card p-10 border-[3px] border-solid rounded-[10px] border-[#21C452] flex flex-col justify-between items-center transition-transform duration-300 hover:scale-105 w-[250px] h-[220px]"
          >
            <div className="flex justify-center items-center">
              <Image src={item.src} alt={item.alt} width={75} height={75} />
            </div>
            <div className="flex flex-col justify-evenly space-y-2 w-full">
              <div className="text-[14px] leading-[normal] text-center">
                {item.title}
              </div>
              <div className="text-[12px] leading-[normal] text-center">
                {item.description}
              </div>
            </div>
          </Link>          
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
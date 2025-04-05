import React from 'react';

type PageProps = {
  page: string;
};

type PageInfo = {
  title: string;
  description: string;
};

const PlaceholderPage: React.FC<PageInfo> = ({ title, description }) => {
  return (
    <div className="bg-[#92EDAD] min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl">{description}</p>
    </div>
  );
};

const Page: React.FC<PageProps> = ({ page }) => {
  const pages: Record<string, PageInfo> = {
    employers: {
      title: 'Employers',
      description: 'Welcome to the Employers page. Here, you can find top candidates and manage job postings effectively.',
    },
    candidates: {
      title: 'Candidates',
      description: 'Discover job opportunities and connect with top employers on our platform.',
    },
    support: {
      title: 'Customer Support',
      description: 'Need help? Our support team is here to assist you with any inquiries.',
    },
    documentation: {
      title: 'Documentation',
      description: 'Find guides, API references, and tutorials to help you navigate our platform.',
    },
    terms: {
      title: 'Terms of Service',
      description: 'Review our terms and conditions to understand the use of our services.',
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'Learn how we collect, use, and protect your personal information.',
    },
  };

  return <PlaceholderPage {...(pages[page] || pages.employers)} />;
};

export default Page;

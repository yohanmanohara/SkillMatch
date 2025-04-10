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
    success: {
      title: 'Success Stories',
      description: 'Explore stories of successful matches between employers and candidates.',
    },
    support: {
      title: 'Help Center',
      description: 'Need help? Our support team is here to assist you with any inquiries.',
    },
    docs: {
      title: 'API Documentation',
      description: 'Find guides, API references, and tutorials to help you integrate and use our platform.',
    },
    community: {
      title: 'Community',
      description: 'Join our vibrant community to connect, learn, and grow together.',
    },
    about: {
      title: 'About Us',
      description: 'Learn more about our mission, values, and the team behind SkillMatch.',
    },
    careers: {
      title: 'Careers',
      description: 'Join our team and help shape the future of job matching and recruitment.',
    },
    blog: {
      title: 'Blog',
      description: 'Read insights, news, and updates from the SkillMatch team.',
    },
    terms: {
      title: 'Terms of Service',
      description: 'Review our terms and conditions to understand the use of our services.',
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'Learn how we collect, use, and protect your personal information.',
    },
    cookies: {
      title: 'Cookie Policy',
      description: 'Understand how we use cookies and how they impact your experience.',
    },
  };

  return <PlaceholderPage {...(pages[page] || pages.employers)} />;
};

export default Page;